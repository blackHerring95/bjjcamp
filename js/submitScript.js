document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("myForm");
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const email = document.getElementById("email-input").value;
        const ime = document.getElementById("ime-input").value;
        const prezime = document.getElementById("prezime-input").value;

        try {
            const formData = {
                email: email,
                ime: ime,
                prezime: prezime
              };
      
                const formDataJson = JSON.stringify(formData);

            const response = await fetch('https://notion-googledrive-integrator.azurewebsites.net/api/AddUser?code=BcuwbamhO6D-IsRs5Wpo5vayjghucjZ6eWL8Ny13F37wAzFuJDqTuA%3D%3D', {
                method: 'POST',
                body: formDataJson,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            });

            const responseData = await response.json();

            if (responseData.StatusCode == 200) {

                document.getElementById("email-input").value = '';
                document.getElementById("ime-input").value= '';
                document.getElementById("prezime-input").value= '';
                alert("Uspjesno ste prijaljveni.");
            } else {
                responseMessage.textContent = `Greska: ${responseData.Value || 'An error occurred'}`;
                alert(`Greska ${responseData.Value}`);
            }
        } catch (error) {
            alert(`Greska: ${error.message}`);
        }
    });
});