export function dateFormat(time, datas, types) {
  const date = time === null ? new Date() : new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  if (types === 0) {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  } else if (types === 1) {
    return `${year}-${month}-${day} ${datas}:${seconds}`
  } else if (types === 2) {
    return `${month}.${day}`
  } else if(types === 3) {
		return `${month}月${day}日 ${hours}:${minutes}:${seconds}`
	} else if(types === 4) {
		return `${hours}:${minutes}:${seconds}`
	} else if(types === 5) {
		return `${month}.${day}.${hours}}`
	} else if(types === 6) {
		return `${year}-${month}-${day}`
	}
}