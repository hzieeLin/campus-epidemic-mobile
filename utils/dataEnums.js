export function leaveResults(code) {
	if(code === 1) {
		return `同意`
	}else if(code === 2) {
		return `拒绝`
	}else {
		return `待处理`
	}
}