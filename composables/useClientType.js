import { useContext } from '@nuxtjs/composition-api'

export default function useClientType() {
    const { $auth } = useContext()
}
