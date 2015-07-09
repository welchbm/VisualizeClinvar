class Graph
  # find graph by id
  def self.find(id)
    YAML::load(ERB.new(IO.read(
                        File.join(Rails.root, 'config', 'graphs.yml'))).result).select { |g| g["id"] == id }.first
  end

  # return all items in graphs.yml in the order
  # in which they are listed there
  def self.all
    YAML::load(ERB.new(IO.read(
                        File.join(Rails.root, 'config', 'graphs.yml'))).result)
  end
end
