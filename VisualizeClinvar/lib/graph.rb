class Graph
  attr_reader :graph, :gene, :title, :short_description,
              :long_description, :type, :updated, :author,
              :tsv_path, :static_image_path, :js_path

  def initialize(gene, graph)
    root = File.join(Rails.root, "public/visualize/#{gene}/#{graph}")
    @graph = graph
    @gene = gene
    puts "parsing: #{File.join(root, 'description.json')}"
    description = JSON.parse(File.read(File.join(root, "description.json")))
    @title = description["graph"]["text"]["title"]
    @short_description = description["graph"]["text"]["short"]
    @long_description = description["graph"]["text"]["long"]
    @type = description["graph"]["metadata"]["type"]
    @updated = description["graph"]["metadata"]["updated"]
    @author = description["graph"]["metadata"]["author"]

    # now make root relative to public directory
    root = "/visualize/#{gene}/#{graph}/"
    @tsv_path = "#{root}/data.tsv"
    @static_image_path = "#{root}/static.jpg"
    @js_path = "#{root}/view.js"
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
