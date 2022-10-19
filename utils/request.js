const reqest = (config) => {
	// https://49t17g0193.zicp.fun/campus-epidemic-system
	config.url = 'https://49t17g0193.zicp.fun/campus-epidemic-system'+ config.url
	// config.url = '/jixian'+ config.url
	if(!config.data) {
		config.data = {}
	}
return new Promise((resolve,reject) => {
        uni.request({
            ...config,
            success: (res) => {
                // console.log(res);
								const { code} = res.data
								switch(code) {
									case 200: 
										resolve(res.data.data)
										break
									case 400:
										console.log(res.data.message)
										uni.showToast({
												title: `${res.data.message}`,
												icon: 'error',
												duration: 2000
										});
										break
									default: 
										console.log(res.data.message)
										uni.showToast({
												title: `${res.data.message}`,
												icon: 'error',
												duration: 2000
										});
								}
            },
            fail: (err) => {
                console.log(err);
                // console.log(options);
                reject(err)
            }
        })
    })
}
export default reqest;