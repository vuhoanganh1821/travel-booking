export interface IHeader {
  Authorization?: string
  'Content-Type'?: string
  Accept?: string
  "Content-Length"?: string
  "User-Agent"?: string
  "Content-Encoding"?: string
  [key: string]: string | undefined // Index signature to allow additional headers
}
