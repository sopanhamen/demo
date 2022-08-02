import api from "../rest.service"

const EVENT = '/events'

export const getEvents = async () =>
{
	try {
		const res = await api.get(EVENT)
		return { ...res, isError: false }
	} catch (error) {
		return { ...error, isError: true }
	}
}

export const getEvent = async(id) => {
  try {
		const res = await api.get(`${EVENT}/${id}`)
		return { ...res, isError: false }
	} catch (error) {
		return { ...error, isError: true }
	}
}
