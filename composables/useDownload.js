export default function useDownload() {
  const download = (file, response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', file.file_name || 'file')
    document.body.appendChild(link)
    link.click()
  }

  return { download }
}
