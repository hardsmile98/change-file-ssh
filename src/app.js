function changeFileSSH({
    ip,
    port = 22,
    user,
    password,
    path,
    content
}) {
    if(!ip || !user || !password || !path || !content)  {
        return {
            success: false,
            message: (!ip && 'ip parameter not specified') 
                || (!user && 'user parameter not specified')
                || (!password && 'password parameter not specified')
                || (!path && 'path parameter not specified')
                || (!content && 'content parameter not specified')
        }
    }

    return { success: true }
}

const xxx = changeFileSSH({
    ip: '31.129.108.202',
    user: 'root',
    password: 'KEr%TqoT5QiW',
    path: '/tmp/filename.txt',
    content: '12345'
})

console.log(xxx);