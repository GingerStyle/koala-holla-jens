console.log('js');

$(onReady);

function onReady() {
  $('#addButton').on('click', koalasPost);
  $('#viewKoalas').on('click', '.update', updateKoala);
  $('#viewKoalas').on('click', '.delete', deleteKoala);
  // load existing koalas on page load
  getKoalas();

}; // end doc ready

function updateKoala(){
  let id = $(this).parent().parent().data('id');
  let transferStatus = $(this).parent().parent().data('status');
  if (transferStatus == 'y' || transferStatus == 'yes'){ 
    transferStatus = 'no';
  }else if (transferStatus == 'n' || transferStatus == 'no'){
    transferStatus = 'yes';
  };
  console.log('in updateKoala');
  $.ajax({
    method: 'PUT',
    url: `/koalas/ready_to_transfer/${id}`,
    data: {status: transferStatus}
  }).then((response) => {
    console.log('db response', response);
    getKoalas();
  }).catch((error) => {
    console.log('error updating data', error);
  });
}

function deleteKoala(){
  console.log('In delete Koala button');
  let id = $(this).parent().parent().data('id');
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${id}`,
  }).then(() => {
    getKoalas();
  }).catch((error) => {
    console.log('There is a problem with the DELETE function')
  });
}

function koalasPost() {
  console.log('in addButton on click');
  let koalaToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    ready_to_transfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val()
  };
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
  
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: koalaToSend
  }).then(() => {
    console.log('In POST function');
    getKoalas();
  }).catch((error) => {
    console.log('Problem with POST function', error);
  });
  // call saveKoala with the new object
}

function getKoalas() {
  console.log('in getKoalas');
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then((response) => {
    render(response);
  }).catch((error) => {
    console.log('Problem with GET function', error);
  });
} // end getKoalas

function render(koalaObject) {
  console.log('In render function');
  $('#viewKoalas').empty();
  for (let object of koalaObject) {
    $('#viewKoalas').append(`
    <tr data-id="${object.id}" data-status="${object.ready_to_transfer}">
      <td> ${object.name} </td>
      <td> ${object.age} </td>
      <td> ${object.gender} </td>
      <td> ${object.ready_to_transfer} </td>
      <td> ${object.notes} </td>
      <td>
        <button class="update"> UPDATE </button>
        <button class="delete"> DELETE </button>
      </td>
    </tr>
    `)
  };
}