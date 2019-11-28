const oldValue = window.localStorage.getItem('address')
const oldLat = window.localStorage.getItem('lat')
const oldLng = window.localStorage.getItem('lng')

$('.input__value').html(oldValue)
$('.lat').html(oldLat)
$('.lng').html(oldLng)

//localstorage如何下在標題列?
function createAddress() {
    // var list = ['台灣大學', '政治大學']
    // var newList = []
    // for(var i = 0; i < list.length; i += 1){
    //        newList.push(list[i])
    // }

    // console.log(newList.join(' '))

    var input__textArea = $('.input__textArea').val()

    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${input__textArea}&key=AIzaSyBGUJ4osCN5Wb5_aPKacYdOCC2qKClAKjQ`

    $.ajax({
        type: 'POST',
        url: url,
        address: input__textArea
    })

        .done((resp) => {
            const lat = resp.results[0].geometry.location.lat
            const lng = resp.results[0].geometry.location.lng

            window.localStorage.setItem('address', input__textArea)
            window.localStorage.setItem('lat', lat)
            window.localStorage.setItem('lng', lng)

            $('table').append(
                `<thead>
                            <tr>
                                <td scope="col class="input_value">${input__textArea}</td>
                                <td scope="col" class="lat">${lat}</td>
                                <td scope="col" class="lng">${lng}</td>
                            </tr>
                        </thead>`
            )



        })

        .fail((resp) => {
            alert('請輸入地址')
        })




    $('.input__textArea').val('')
}
//}

$('.btn').on('click', createAddress)
$('.input__textArea').keydown(function (e) {
    if (e.keyCode === 13) {
        createAddress()
    }
})
