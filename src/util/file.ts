import * as check from './check'

// interface AElement {

// }

const saveFile = (content: string | Blob, type: string, fileName?: string): void => {
  let blob: Blob | string = content
  if (check.isString(content)) {
    blob = new Blob([content], { type })
  }
  let url: string = URL.createObjectURL(blob)
  let a: any = document.createElement('a')
  a.download = fileName ? fileName : 'untitle'
  a.href = url
  a.click()
  // HTML
}


export { saveFile }

