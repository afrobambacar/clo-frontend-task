export interface IPost {
  seq: number
  creator: string
  title: string
  body: string
  imgList: string
  viewCnt: number
  startDt: string
}

export const fetchPostItems = async () => {
  const res = await fetch('https://recruiting-api.marvelousdesigner.com/api/data')
  return res.json() 
}
