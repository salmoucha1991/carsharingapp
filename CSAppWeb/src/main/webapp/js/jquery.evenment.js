function loadMyTripAgree()
{
	$('#myPostOffer').empty();
	$('#myAgreeOffer').empty();
	$('#resultSearch').empty();

	$('#divWaitingMmAgreeOffer').css('display','block'); 
	$.ajax({
        method: 'post',
        url: WEB_ROOT_URL+'CSAppWeb/MyPostAgree',
        success: function(data)
        {
             $('#myAgreeOffer').html(data);
             $('#divWaitingMmAgreeOffer').css('display','none'); 
        }
	});
}
function loadMyTripPost()
{
	$('#myPostOffer').empty();
	$('#myAgreeOffer').empty();
	$('#resultSearch').empty();
	
	$('#divWaitingMyPostOffer').css('display','block');
	$.ajax({
        method: 'post',
        url: WEB_ROOT_URL+'CSAppWeb/MyPostOffer',
        success: function(data)
        {
             $('#myPostOffer').html(data);
             $('#divWaitingMyPostOffer').css('display','none');
        }
	});
}
function loadMessageReceive()
{
 	//Requete ajax pour récuperer les messages boite de reception
	$('#divWaitingReceive').css('display','block'); 
	$('#receive').empty();
	$.ajax({
        method: 'post',
        url: WEB_ROOT_URL+'CSAppWeb/MessageReceive',
        success: function(data)
        {
             $('#receive').html(data);

             $("#list2").accordion({
					collapsible: true,
					active: -1
			});

			//Ajoute les évement ajax au message recu
				ajaxSendResponse();
				$("#divWaitingReceive").css('display','none');
        }
	});
}
function loadMessageSend()
{
	$('#divWaitingSend').css('display','block');
	$('#send').empty();
	//Requete ajax pour récuperer les messages boite de reception
    $.ajax({
            method: 'post',
            url: WEB_ROOT_URL+'CSAppWeb/MessageSend',
            success: function(data)
            {
             	$('#send').html(data);		
				 $("#list1").accordion({
						collapsible: true,
						active: -1
				});
 				$('#divWaitingSend').css('display','none');
            }
          });//Fin ajax
}
function validateForm2()
{
	$('#post_form_etape_2').validate({
		submitHandler: function(form) {
			goToEtape3OfPost();
		}
	}
	);
}
function goToEtape2OfPost()
{
	var postData = $("input", '#post_form').serialize();
        
    $.ajax({
            method: 'post',
            url: WEB_ROOT_URL+'CSAppWeb/PostEtape2',
            data: postData,
            success: function(data)
            {
    			$('#startPost').attr('disabled', true);
    			$('#stopPost').attr('disabled', true);
    			$('#nbPassagerPost').attr('disabled', true);
    			
                $('#etape1').html(data);
        		//$(".corner").corner();
                validateForm2();
            }
    });
}
function goToEtape3OfPost()
{
	var postData = $("input", '#post_form_etape_2').serialize();
            
    $.ajax({
            method: 'post',
            url: WEB_ROOT_URL+'CSAppWeb/PrintMapPost',
            data: postData,
            success: function(data)
            {
    			$('#etape1').html(data);
    			initializeMapParcoursPost();
    			addEvementAjaxToSaveOffer();
            }
	});
  
}
function requestParticipate(idTrip)
{
	$('#requesting').css('display','block');
    $.ajax({
    	method: 'get',
        url: WEB_ROOT_URL+'CSAppWeb/RequestParticipateTrip?idTrip='+idTrip,
        success: function(data)
        {
    		$('#buttonPartcipipate').html(data);
            $('#requesting').css('display','none');
        }
   });
   return false;
}
function ajaxSendMessageCustomer(nameCustomer)
{
	$('#sending'+nameCustomer).css('display','block');
	var postData = $("input", '#form_sendMessage'+nameCustomer).serialize();

	$.ajax({
    	method: 'post',
        url: WEB_ROOT_URL+'CSAppWeb/MessageWriteResponse',
        data: postData,
        success: function(data)
        {
        	$('#content'+nameCustomer).val('');
        	$('#title'+nameCustomer).val('');
            $('#sending'+nameCustomer).css('display','none');
        }
   });
   return false;
}
function ajaxSendMessage()
{
	$('#sending').css('display','block');
	var postData = $("input", '#form_sendMessage').serialize();
    $.ajax({
    	method: 'post',
        url: WEB_ROOT_URL+'CSAppWeb/MessageWriteResponse',
        data: postData,
        success: function(data)
        {
        	$('#contentSendSearch').val('');
        	$('#titleSendSearch').val('');
            $('#sending').css('display','none');
        }
   });
   return false;
}
function printTrip(idTrip,divResult)
{
    $.ajax({
            method: 'get',
            url: WEB_ROOT_URL+'CSAppWeb/PrintMapSearch?idTrip='+idTrip,
            success: function(data)
            {
                 $('#'+divResult).html(data);
                 initializeMapParcoursSearch();
            }
              });
    
    return false;
}
function updateReadMessage(idMessage)
    {          
		//Décremente le nombre de message lu
        $.ajax({
                method: 'get',
                url: WEB_ROOT_URL+'CSAppWeb/UpdateMessageRead?idMessage='+idMessage,
                success: function(data)
                {
                 }
                });
        if( parseInt($('#numberOfMessageNotRead').text() )  > 0)
        {
        	$('#numberOfMessageNotRead').html(
        			parseInt(
        					$('#numberOfMessageNotRead').html()
        					) - 1);
        }
        return false;
    }
function ajaxNumberOfMessageNotRead()
{
	$.ajax({
	    method: 'get',
	    url: WEB_ROOT_URL+'CSAppWeb/GetNumberOfMessageReadNotRead',
	    success: function(data)
	    {
			$('#numberOfMessageNotRead').text(data);
	     }
	    });
}
function ajaxSendResponse(i)
{
	$('#sending'+i).css('display','block');
	var postData = $("input", '#form_sendResponse'+i).serialize();
    $.ajax({
    	method: 'post',
        url: WEB_ROOT_URL+'CSAppWeb/MessageWriteResponse',
        data: postData,
        success: function(data)
        {
    		$('#sending'+i).css('display','none');
        }
   });
   return false;
}
//Ajout des évenements ajax
function addEvementAjaxToSaveOffer()
{
	$('input.saveOffer').click(function()
	        {
	                var postData = $("input", '#saveOffer_form').serialize();
	                $.ajax({
	                        method: 'post',
	                        url: WEB_ROOT_URL+'CSAppWeb/SaveOffer',
	                        data: postData,
	                        success: function(data)
	                        {
	                			alert("offre enregistre");
	                        }
	                          });
	                return false;
	        });
}
//Ajout des évenements ajax
function ajaxCheckInAjax()
{
	var postData = $("input", '#checkaddress_form').serialize();
    $.ajax({
            method: 'post',
            url: WEB_ROOT_URL+'CSAppWeb/CheckInAjax',
            data: postData,
            success: function(data)
            {
    			alert("Profil enregistre");
    			//Si success redection vers le profil
    			document.location.href=WEB_ROOT_URL+'CSAppWeb/Accueil#profil';
            }
              });
    return false;
}
function ajaxSearch()
{
	$('#myPostOffer').empty();
	$('#myAgreeOffer').empty();
    var postData = $("input", '#search_form').serialize();
    $.ajax({
            method: 'post',
            url: WEB_ROOT_URL+'CSAppWeb/ResultSearch',
            data: postData,
            success: function(data)
            {
             $('#resultSearch').html(data);
 			initializeMapParcoursSearch();
            }
           });
}