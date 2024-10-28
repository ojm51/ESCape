import Axios from 'axios'

const Base_URL = process.env.NEXT_PUBLIC_BOARD_API_URL

interface postImageProps {
  id: string
  formData: FormData
}

export async function postImage({ id, formData }: postImageProps) {
  const url = `${Base_URL}/images/${id}`
  formData.append('file', formData.get('image') as string)
  const response = await Axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
