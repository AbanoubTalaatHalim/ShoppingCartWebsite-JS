
var p_data= '';
            $.getJSON("data.json", function(data) {

                $.each(data, function(key, value){
                    p_data += '<div class="image">';
                    p_data += '<img src="images/'+ value.tag +'.jpg">';
                    p_data += '<h3>' + value.name + '</h3>';
                    p_data += '<h3>' + value.price + '</h3>';
                    p_data += '<a class="add-cart" href="#">Add Cart</a>'
                    
                    p_data += '</div>'
                });
                $('.container').append(p_data);
            });