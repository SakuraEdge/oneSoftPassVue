function getSourceSuffix(type){
    if (Number(type) === 0) {
        return 'jdbc:oracle:thin:@'
    } else {
        return 'jdbc:mysql://'
    }
}

function getUrls(type,ip,port,table) {
    if (table === null || table === ''){
        return getSourceSuffix(type) + ip + ':' + port
    }
    return getSourceSuffix(type) + ip + ':' + port + '/' + table
}

export default {
    getSourceSuffix,
    getUrls,

}
