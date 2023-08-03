exports.mapGetCareviger = (data) =>{
    return {
        email: data?.Item?.email?.S,
        name: data?.Item?.name?.S,
        lastName: data?.Item?.lastName?.S
    }
}

exports.mapSearchCareviger = (data) =>{
    const mapItem = data.Items.map((item)=>{
        return {
            email: item.email.S,
            name: item.name.S,
            lastName: item.lastName.S,
            dateAvailableFrom: item.dateAvailableFrom.S,
            dateAvailableUntil: item.dateAvailableUntil.S,
            phone: item.phone.S
        }
    })
    return mapItem;
}