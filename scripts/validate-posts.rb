#!/usr/bin/env ruby
# frozen_string_literal: true

require "date"
require "yaml"

required = %w[layout title description date tags slug]
errors = []
Dir.glob("_posts/*.{md,markdown}").sort.each do |path|
  text = File.read(path, encoding: "UTF-8")
  match = text.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  unless match
    errors << "#{path}: Front Matter is missing"
    next
  end
  begin
    data = YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: false) || {}
  rescue Psych::Exception => e
    errors << "#{path}: invalid YAML (#{e.message})"
    next
  end
  required.each do |key|
    value = data[key]
    errors << "#{path}: required '#{key}' is missing" if value.nil? || (value.respond_to?(:empty?) && value.empty?)
  end
  errors << "#{path}: layout must be 'post'" if data["layout"] && data["layout"] != "post"
  errors << "#{path}: tags must be a non-empty array" if data["tags"] && (!data["tags"].is_a?(Array) || data["tags"].empty?)
  errors << "#{path}: toc must be boolean" if data.key?("toc") && ![true, false].include?(data["toc"])
  errors << "#{path}: comments must be boolean" if data.key?("comments") && ![true, false].include?(data["comments"])
  if data["series"]
    valid_series = data["series"].is_a?(Hash) && data["series"]["name"] && data["series"]["order"].is_a?(Numeric)
    errors << "#{path}: series requires name and numeric order" unless valid_series
  end
end

if errors.empty?
  puts "Post Front Matter validation passed."
else
  warn errors.join("\n")
  exit 1
end
