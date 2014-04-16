'''
Django views for Variant_History in VisualizeClinVar project.
'''
import matplotlib
import matplotlib.dates as mdates
from collections import defaultdict
from matplotlib import pylab
from pylab import *
import PIL
import PIL.Image
import StringIO

from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from Variant_History.models import Dspclinva

def home(request):
    '''
    Gets home view.

    Returns a template of the home view
    '''
    template = loader.get_template('home.html')
    output = {}
    genes = geneNum()
    phenotypes = phenoNum()
    output['gene'] = genes
    output['phenotype'] = phenotypes
    context = RequestContext(request, {'output': output})
    return HttpResponse(template.render(context))

def geneNum():
    '''
    Returns the number of genes in ClinVar
    Args: None
    Returns:
    An int of the number of genes in ClinVar
    '''
    geneNumber = Dspclinva.objects.values_list('gene')
    gene_list = []
    for items in geneNumber:
        gene_list.append(items[0])
    counts = defaultdict(int)
    for item in gene_list:
        counts[item] += 1
    return len(counts)

def phenoNum():
    '''
    Returns the number of phenotypes in ClinVar
    Args: None
    Returns:
    An int of the number of phenotypes in ClinVar
    '''
    phenoNumber = Dspclinva.objects.values_list('phenotype')
    pheno_list = []
    for items in phenoNumber:
        pheno_list.append(items[0])
    counts = defaultdict(int)
    for item in pheno_list:
        counts[item] += 1
    return len(counts)

def history(request):
    '''
    Creates a matplotlib line chart of the variant history and gives view.

    Returns a template of the home view
    '''
    varHistory = Dspclinva.objects.values_list('date_created')
    date_list = []
    for items in varHistory:
        date_list.append(items[0])
    sortDateList = sort(date_list)
    dates = matplotlib.dates.date2num(sortDateList)
    counts = defaultdict(int)
    for item in dates:
        counts[item] += 1

    allDates = []
    allValues = []
    for key, value in counts.iteritems():
        allDates.append(key)
        allValues.append(value)

    addedValues = []
    for index, elem in enumerate(allValues):
        if index == 0:
            temp = elem
            addedValues.append(temp)
        else:
            temp += elem
            addedValues.append(temp)

    sortDates = sort(allDates)

    x = sortDates
    y = addedValues
    years = mdates.YearLocator()   # every year
    months = mdates.MonthLocator()  # every month
    yearsFmt = mdates.DateFormatter('%Y')
    fig, ax = plt.subplots()
    ax.plot(x,y)
    ax.xaxis.set_major_locator(years)
    ax.xaxis.set_major_formatter(yearsFmt)
    ax.xaxis.set_minor_locator(months)
    fig.autofmt_xdate()

    buffer = StringIO.StringIO()
    canvas = pylab.get_current_fig_manager().canvas
    canvas.draw()
    graphIMG = PIL.Image.fromstring("RGB", canvas.get_width_height(), canvas.tostring_rgb())
    graphIMG.save(buffer, "PNG")
    pylab.close()
    return HttpResponse(buffer.getvalue(), content_type="image/png")

def varType(request):
    '''
    Creates a matplotlib pie chart of the variant type and gives view.

    Returns a template of the varType view
    '''
    varType = Dspclinva.objects.values_list('var_type')
    varList = []
    for items in varType:
        varList.append(items[0])

    counts = defaultdict(int)
    for item in varList:
        counts[item] += 1

    varType = []
    values = []
    for key, value in counts.iteritems():
        varType.append(key)
        values.append(value)

    figure(1, figsize=(10,10))
    ax = axes([0.1, 0.1, 0.8, 0.8])
    labels = varType
    fracs = values
    cmap = plt.cm.jet
    colors = cmap(np.linspace(0., 1., len(fracs)))
    p, t = pie(fracs, colors =colors, startangle=90)
    legend(p, labels, loc="lower left")
    axis('equal')

    buffer = StringIO.StringIO()
    canvas = pylab.get_current_fig_manager().canvas
    canvas.draw()
    graphIMG = PIL.Image.fromstring("RGB", canvas.get_width_height(), canvas.tostring_rgb())
    graphIMG.save(buffer, "PNG")
    pylab.close()
    return HttpResponse(buffer.getvalue(), content_type="image/png")

def varInterpret(request):
    '''
    Creates a matplotlib bar chart of the variant interpretation and gives view.

    Returns a template of the varType view
    '''
    interpret = Dspclinva.objects.values_list('interpretation')

    interList = []
    for items in interpret:
        interList.append(items[0])

    counts = defaultdict(int)
    for item in interList:
        counts[item] += 1

    interType = []
    values = []
    for key, value in counts.iteritems():
        interType.append(key)
        values.append(value)

    N = len(counts)
    means = values
    ind = arange(N)
    width = 0.35

    fig, ax = subplots()
    rects1 = ax.bar(ind, means, width)
    subplots_adjust(bottom=0.30)
    ax.set_ylabel('Number of Variants')
    ax.set_title('Interpretation of Variants')
    ax.set_xticks(ind+width)
    ax.set_xticklabels(interType, size='small', ha='right', rotation = 45)

    buffer = StringIO.StringIO()
    canvas = pylab.get_current_fig_manager().canvas
    canvas.draw()
    graphIMG = PIL.Image.fromstring("RGB", canvas.get_width_height(), canvas.tostring_rgb())
    graphIMG.save(buffer, "PNG")
    pylab.close()
    return HttpResponse(buffer.getvalue(), content_type="image/png")

