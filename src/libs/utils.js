// blob导出Excel的方法，但是导出的excel存在乱码问题
export function exportExcel(res, name = "导出用例.xls", type) {
  let ty = type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  let blob = new Blob([res], {type: ty})
  let link = document.createElement('a')
  link.style.display = 'none'
  let href = window.URL.createObjectURL(blob)
  link.href = href
  link.download = name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(href)
}