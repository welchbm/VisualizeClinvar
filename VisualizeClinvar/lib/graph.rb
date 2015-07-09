class Graph
  attr_reader :error

  def initialize(id)
    @config = YAML::load(ERB.new(IO.read(
                                  File.join(Rails.root, 'config', 'graphs.yml'))).result)[id]
    @error = @config.nil?
  end

  def method_missing(name, *args, &block)
    @config[name.to_s]
  end
end
