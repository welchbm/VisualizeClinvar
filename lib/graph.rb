class Graph
  attr_reader :graph, :gene, :title, :short_description,
              :long_description, :type, :updated, :author,
              :tsv_path, :static_image_path, :js_path

  def initialize(gene, graph)
    root1   = File.join(Rails.root, "public/visualize/#{gene}/#{graph}")
    @graph = graph
    @gene  = gene
    description = JSON.parse(File.read(File.join(root1, "description.json")))
    @title             = description["graph"]["text"]["title"]
    @short_description = description["graph"]["text"]["short"]
    @long_description  = description["graph"]["text"]["long"]
    @type              = description["graph"]["metadata"]["type"]
    @updated           = description["graph"]["metadata"]["updated"]
    @author            = description["graph"]["metadata"]["author"]

    # now make root relative to public directory
    root2 = "/visualize/#{gene}/#{graph}/"
    @tsv_path = "#{root2}/data.tsv"
    # if no view.js exists in gene's directory,
    # use view from global/
    @js_path = File.exists?("#{root1}/view.js") ?
                 "#{root2}/view.js" :
                 "/visualize/global/#{graph}/view.js"
  end

  def self.all_in_gene(gene)
    # get all graph types in global in some
    # canonical order
    root = File.join(Rails.root, "public/visualize/#{gene}")
    graph_types = Dir.entries(root).
                  select { |entry| File.directory?(File.join(root, entry)) && !(entry == '.' || entry == '..') }.
                  sort

    graph_types.map { |g_t| Graph.new(gene, g_t) }
  end
end
