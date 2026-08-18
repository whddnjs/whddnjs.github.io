#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"

site_dir = ARGV[0] || "_site"
root = Pathname(site_dir).expand_path
abort "#{site_dir} does not exist; build Jekyll before link validation." unless root.directory?
errors = []
html_files = Dir.glob(root.join("**/*.html").to_s)
html_files.each do |file|
  source = Pathname(file)
  File.read(file, encoding: "UTF-8").scan(/(?:href|src)\s*=\s*["']([^"']+)["']/i).flatten.each do |url|
    next if url.empty? || url.start_with?("#", "mailto:", "tel:", "data:", "javascript:", "http://", "https://", "//")
    path = url.split(/[?#]/).first
    target = if path.start_with?("/")
               root.join(path.sub(%r{\A/}, ""))
             else
               source.dirname.join(path)
             end
    valid = target.file? || target.directory? || target.join("index.html").file? || (target.extname.empty? && Pathname("#{target}.html").file?)
    errors << "#{source.relative_path_from(root)}: broken internal link #{url}" unless valid
  end
end

if errors.empty?
  puts "Internal link validation passed."
else
  warn errors.uniq.join("\n")
  exit 1
end
