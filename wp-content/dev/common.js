$(document).ready(function() {
	toastr.options = {
		"closeButton": false,
		"debug": false,
		"newestOnTop": false,
		"progressBar": false,
		"positionClass": "toast-bottom-right",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
	if ($("#css-formatter_input").length) {
		initialize_codemirror("css-formatter_input", 'css');
		initialize_codemirror("css-formatter_output", 'css');
	}
	if ($("#html-formatter_input").length) {
		initialize_codemirror("html-formatter_input", 'xml');
		initialize_codemirror("html-formatter_output", 'xml');
	}
	if ($("#javascript-formatter_input").length) {
		initialize_codemirror("javascript-formatter_input", 'javascript');
		initialize_codemirror("javascript-formatter_output", 'javascript');
	}
	if ($("#compress-javascript_input").length) {
		initialize_codemirror("compress-javascript_input", 'javascript');
		initialize_codemirror("compress-javascript_output", 'javascript');
	}
	if ($("#compress-css_input").length) {
		initialize_codemirror("compress-css_input", 'css');
		initialize_codemirror("compress-css_output", 'css');
	}
	if ($("#json-formatter_input").length) {
		initialize_codemirror("json-formatter_input");
		initialize_codemirror("json-formatter_output");
	}
	if ($("#sql-formatter_input").length) {
		initialize_codemirror("sql-formatter_input", 'sql');
		initialize_codemirror("sql-formatter_output", 'sql');
	}
	if ($("#html-to-markdown-converter_input").length) {
		initialize_codemirror("html-to-markdown-converter_input");
		initialize_codemirror("html-to-markdown-converter_output");
	}
	var search_options = {
		valueNames: ['name', 'description']
	};
	var clipboard = new ClipboardJS('.dev_tool_copy');
	clipboard.on('success', function(e) {
		toastr.success('Copied');
	});
	var copyShareLink = new ClipboardJS('#copy-share-link');
	$('#add_field').click(function() {
		if ($('#faker_field_table tbody').find('tr').length > 9) {
			alert('Maximum 10 fields can be added');
			return false;
		}
		$('#faker_field_table').append($('#hidden_faker_row').html());
		$('#faker_field_table tr:last').find('.faker_field').last().focus();
	});
	$(document).on('click', '.remove-row', function(e) {
		$(this).closest('tr').remove();
	});
	if ($("#shared_content").length) {
		var code_language = $('#code_language').val();
		initialize_codemirror("shared_content", code_language);
		var cm = $("#shared_content").next(".CodeMirror").get(0).CodeMirror;
	}
	$('select#code_language').select2({
		theme: "bootstrap-5"
	});
	$(document).on('select2:open', () => {
		let allFound = document.querySelectorAll('.select2-container--open .select2-search__field');
		allFound[allFound.length - 1].focus();
	});
	var urlCopy = new ClipboardJS('#url_copy_btn');
	urlCopy.on('success', function(e) {
		toastr.success('Copied');
	});
	
});

function dev_tool_submit(b) {
	var btn = $(b);
	var container = btn.closest("div.dev_tool_container");
	var textarea = container.find("textarea.dev_tool_text");
	var formatter = textarea.attr("data-formatter");
	var ajaxurl = $('#dev_tool_admin_url').val();
	var val = textarea.val();
	if (val == "") {
		toastr.error("Invalid input");
		return false;
	}
	if (formatter == "json-decoder") {
		val = JSON.parse(val);
	}
	if (formatter == "base64-encoder") {
		container.find(".dev_tool_result").val(btoa(val));
		toastr.success('done');
		return true;
	}
	if (formatter == "base64-decoder") {
		container.find(".dev_tool_result").val(atob(val));
		toastr.success('done');
		return true;
	}
	if (formatter == "javascript-formatter" || formatter == "html-formatter" || formatter == "css-formatter" || formatter == "compress-javascript" || formatter == "compress-css" || formatter == "json-formatter" || formatter == "sql-formatter" || formatter == 'html-to-markdown-converter') {
		var spaces = parseInt(container.find(".tabsize").val());
		var wrap = container.find(".wrap-line-length").val();
		var max_preserve_newlines = container.find(".max-preserve-newlines").val();
		var beautify_option = {
			wrap_line_length: wrap,
			max_preserve_newlines: max_preserve_newlines
		};
		if (spaces == 0) {
			beautify_option.indent_with_tabs = true;
		} else {
			beautify_option.indent_size = spaces;
		}
		if (formatter == "javascript-formatter") {
			var editor = $("#javascript-formatter_output").next(".CodeMirror").get(0).CodeMirror;
			editor.getDoc().setValue(js_beautify(val, beautify_option));
		}
		if (formatter == "html-formatter") {
			var editor = $("#html-formatter_output").next(".CodeMirror").get(0).CodeMirror;
			editor.getDoc().setValue(html_beautify(val, beautify_option));
		}
		if (formatter == "css-formatter") {
			var editor = $("#css-formatter_output").next(".CodeMirror").get(0).CodeMirror;
			editor.getDoc().setValue(css_beautify(val, beautify_option));
		}
		if (formatter == "compress-javascript") {
			const result = Terser.minify(val);
			const getMinified = async () => {
				const minified = await result;
				var editor = $("#compress-javascript_output").next(".CodeMirror").get(0).CodeMirror;
				editor.getDoc().setValue(minified.code);
			};
			getMinified();
		}
		if (formatter == "compress-css") {
			var editor = $("#compress-css_output").next(".CodeMirror").get(0).CodeMirror;
			editor.getDoc().setValue(minify_css(val));
		}
		if (formatter == "json-formatter") {
			val = JSON.parse(val);
			if (spaces == 0) {
				spaces = "\t";
			}
			var editor = $("#json-formatter_output").next(".CodeMirror").get(0).CodeMirror;
			editor.getDoc().setValue(JSON.stringify(val, null, spaces));
		}
		if (formatter == "sql-formatter") {
			var indent = spaces > 0 ? numToSpaces(spaces) : '   ';
			var is_uppercase = false;
			if ($('#is_uppercase').is(':checked')) {
				is_uppercase = true;
			}
			var editor = $("#sql-formatter_output").next(".CodeMirror").get(0).CodeMirror;
			editor.getDoc().setValue(window.sqlFormatter.format(val, {
				indent: indent,
				uppercase: is_uppercase
			}));
		}
		if (formatter == "html-to-markdown-converter") {
			var turndownService = new TurndownService({
				headingStyle: 'atx',
				codeBlockStyle: 'fenced'
			});
			var markdown = turndownService.turndown(val)
			var editor = $("#html-to-markdown-converter_output").next(".CodeMirror").get(0).CodeMirror;
			editor.getDoc().setValue(markdown);
		}
		toastr.success('done');
		return true;
	}
	var data = {
		text: val,
		formatter: formatter
	};
	$.ajax({
		url: '/format',
		type: "POST",
		data: data,
		success: function(response) {
			container.find(".dev_tool_result").val(response);
			toastr.success('done');
		}
	});
}

function numToSpaces(num) {
	var spaces = '';
	for (i = 1; i <= num; i++) {
		spaces += ' ';
	}
	return spaces;
}

function codemirror_copy(b) {
	var btn = $(b);
	var container = btn.closest("div.dev_tool_container");
	var editor = '';
	if (container.find("#css-formatter_output").length) {
		editor = $("#css-formatter_output").next(".CodeMirror").get(0).CodeMirror;
	}
	if (container.find("#html-formatter_output").length) {
		editor = $("#html-formatter_output").next(".CodeMirror").get(0).CodeMirror;
	}
	if (container.find("#javascript-formatter_output").length) {
		editor = $("#javascript-formatter_output").next(".CodeMirror").get(0).CodeMirror;
	}
	if (container.find("#compress-javascript_output").length) {
		editor = $("#compress-javascript_output").next(".CodeMirror").get(0).CodeMirror;
	}
	if (container.find("#compress-css_output").length) {
		editor = $("#compress-css_output").next(".CodeMirror").get(0).CodeMirror;
	}
	if (container.find("#json-formatter_output").length) {
		editor = $("#json-formatter_output").next(".CodeMirror").get(0).CodeMirror;
	}
	if (container.find("#sql-formatter_output").length) {
		editor = $("#sql-formatter_output").next(".CodeMirror").get(0).CodeMirror;
	}
	if (container.find("#html-to-markdown-converter_output").length) {
		editor = $("#html-to-markdown-converter_output").next(".CodeMirror").get(0).CodeMirror;
	}
	if (container.find("#shared_content").length) {
		editor = $("#shared_content").next(".CodeMirror").get(0).CodeMirror;
	}
	editor.execCommand('selectAll');
	new ClipboardJS('.dev_tool_codemirror_copy', {
		text: function(trigger) {
			return editor.getValue();
		}
	});
	toastr.success('Copied')
}

function initialize_codemirror(selector, mode = 'htmlmixed') {
	var editor = CodeMirror.fromTextArea(document.getElementById(selector), {
		lineNumbers: true,
		theme: 'base16-light',
		mode: {
			name: mode,
			startOpen: true
		},
		indentUnit: 4,
		extraKeys: {
			"F11": function(cm) {
				cm.setOption("fullScreen", !cm.getOption("fullScreen"));
			},
			"Esc": function(cm) {
				if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
			}
		}
	}).on("change", editor => {
		editor.save();
	});
}

function minify_css(val) {
	return val.replace(/([^0-9a-zA-Z\.#])\s+/g, "$1").replace(/\s([^0-9a-zA-Z\.#]+)/g, "$1").replace(/;}/g, "}").replace(/\/\*.*?\*\//g, "");
}