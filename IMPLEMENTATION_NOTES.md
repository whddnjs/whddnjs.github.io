# Implementation notes

`_config.yml` leaves `url`, `repository`, and the giscus identifiers blank because these values cannot be determined from an empty local directory. GitHub Pages needs the eventual GitHub user/repository, and giscus generates `repo_id` and `category_id` only after its GitHub App is enabled for that repository. Set them before deployment; giscus is deliberately not injected until all three required identifiers are present.

For enriched code blocks, standard fenced Markdown receives Rouge syntax highlighting and a copy control. Use Jekyll's `{% highlight language linenos mark_lines="2,4-5" %}` tag for line numbers and highlighted lines. A filename can be supplied with the documented `code-block.html` include. This is the Jekyll-native alternative because ordinary Markdown fenced code blocks do not carry a portable filename or line-highlight metadata field.

For a Markdown-native callout, write a blockquote and give it Kramdown classes: `{: .callout .callout-note}` on the following line. Replace `note` with `tip`, `warning`, or `important` as appropriate. The `callout.html` include is also available where a Liquid include is preferable.

KaTeX resources are loaded when rendered post content contains a dollar-sign math delimiter. Mermaid is loaded only when a Mermaid fenced block is present. Both are the named design dependencies and are served from jsDelivr because GitHub Pages cannot bundle their JavaScript without adding a package build step.

The deployment workflow builds a static Jekyll artifact and deploys it through the official GitHub Pages actions. It intentionally uses the Jekyll and GitHub Pages-supported plugins directly rather than the broad `github-pages` meta-gem: the meta-gem bundles legacy themes and many unrelated plugins, while no Jekyll theme is permitted by this design.

Internal link validation runs immediately after the Jekyll build, rather than before it, because Liquid-generated URLs, Markdown output paths, and compiled static assets do not exist in source form. It still runs before artifact upload and deployment, so any broken rendered link blocks deployment.

Local build verification requires Ruby 3.1–3.x, as declared in `Gemfile`. The available local Ruby is Apple system Ruby 2.6 and cannot resolve current native dependencies. The GitHub Actions runner uses `ruby/setup-ruby` and therefore performs the required build and link validation with a compatible runtime.

The `csv` and `base64` dependencies are explicitly listed because Jekyll 4.3 and its YAML dependency load them, while Ruby 3.4 no longer includes them among default gems. They are Jekyll runtime compatibility dependencies, not site libraries.
