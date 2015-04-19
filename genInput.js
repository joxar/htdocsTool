var result_field = "";
var result_func = "";

var type = "text";
var txtObj = $(":"+type);
mainFunc(txtObj, type, ":"+type);

type = "checkbox";
var ckbxObj = $(":"+type);
mainFunc(ckbxObj, type, ":"+type);

type = "select";
var pldwnObj = $(type+" option:selected");

type = "textarea";
var txaObj = $(type);
mainFunc(txaObj, type, type);

disp(result_field + "\n" + result_func + "\n");

/*
 *
 */
function mainFunc(obj, type, keyword) {
	result_field += crtArray(obj, type) + "\n";
	result_func += genProc(obj, type, keyword);
}

/*
 *
 */
function crtArray(obj, type) {
	var outStr = "";

	outStr += "var array_" + type + " = \[\n";
	if (type === "text"	|| type === "textarea") {
		obj.each(function() {
			outStr += format_arrEle($(this).val());
		});
	} else if (type === "checkbox") {
		obj.each(function() {
			outStr += format_arrEle($(this).prop('checked'));
		});
	} else if (type === "select") {
		obj.each(function() {
			outStr += format_arrEle($(this).text());
		});
	}
	outStr += "\];\n";

	return outStr;
}

/*
 *
 */
function genProc(obj, type, keyword) {
	var proc_str = "";

	proc_str += "(function () {\n";
	proc_str += "\t var obj = $(\"" + keyword + "\");\n";
	proc_str += "\t obj.each(function(idx) {\n";
	proc_str += "\t\t var tmp = array_" + type + "[idx];\n";

	if (keyword === ":text" || keyword === "select"	|| keyword === "textarea") {
		proc_str += "\t\t $(this).val(tmp);\n";
	} else {
		proc_str += "\t\t $(this).prop('checked', tmp);\n";
	}

	proc_str += "\t });\n";
	proc_str += "})();\n";

	return proc_str;
}

/*
 *
 */
function format_arrEle(str) {
	var resultStr = "";
	if (str === false) str = "";
	resultStr += "\"" + str + "\",\n";
	return resultStr;
}

/*
 *
 */
function disp(str) {
	console.log(str);
}
