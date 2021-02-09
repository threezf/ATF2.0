"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportExcel = exportExcel;

// blob导出Excel的方法，但是导出的excel存在乱码问题
function exportExcel(res) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "导出用例.xls";
  var type = arguments.length > 2 ? arguments[2] : undefined;
  var ty = type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8';
  var blob = new Blob([res], {
    type: ty
  });
  var link = document.createElement('a');
  link.style.display = 'none';
  var href = window.URL.createObjectURL(blob);
  link.href = href;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(href);
}