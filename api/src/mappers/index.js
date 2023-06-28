exports.mapGetCareviger = (data) =>{
    return {
        email: data?.Item?.email?.S,
        name: data?.Item?.name?.S,
        lastName: data?.Item?.lastName?.S
    }
}