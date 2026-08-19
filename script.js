let dictionary = {
    "what is her full name": "Marianne Mikaela M. Magtangob",
    "what does bading mean": "si marianne mikaela yan",
    "what is her favorite color": "Asul sa Filipino, favorite ng broski ko",
    "what is her blood type": "O ata",
    "current relationship status": "may asawa't anim na anak na",   
    "Where did she finish high school": "she studied at CatSU Laboratory School from elementary to senior high school.",
    "who's her favorite friend": "si trisha",
};


let savedDictionary =
    localStorage.getItem("dictionary");

if (savedDictionary) {

    dictionary = JSON.parse(savedDictionary);

}



function saveDictionary() {

    localStorage.setItem(
        "dictionary",
        JSON.stringify(dictionary)
    );

}



function searchWord() {

    let searchInput =
        document.getElementById("searchInput");

    let result =
        document.getElementById("result");


   
    let sentence = searchInput.value
        .toLowerCase()
        .trim()
        .replace(/[?.!,]/g, "");


  
    if (sentence === "") {

        result.innerHTML =
            "Please enter a question.";

        return;
    }


    
    let userWords =
        sentence.split(/\s+/);


    let bestMatch = null;
    let highestScore = 0;


   
    for (let question in dictionary) {

        let questionWords =
            question.split(/\s+/);


        let matchedWords = 0;


        
        for (let word of userWords) {

            if (questionWords.includes(word)) {

                matchedWords++;

            }

        }


        let score =
            matchedWords / questionWords.length;


      
        if (score > highestScore) {

            highestScore = score;
            bestMatch = question;

        }

    }


   
    if (highestScore >= 0.5) {

        result.innerHTML =
            "<strong>" + bestMatch + "</strong><br><br>" +
            dictionary[bestMatch];

    } else {

        result.innerHTML =
            "Answer not found.";

    }

}



function addWord() {

    let word =
        document.getElementById("wordInput")
        .value
        .toLowerCase()
        .trim()
        .replace(/[?.!,]/g, "");


    let definition =
        document.getElementById("definitionInput")
        .value
        .trim();


    
    if (word === "" || definition === "") {

        alert(
            "Please enter both the question and answer."
        );

        return;

    }


   
    dictionary[word] = definition;


    saveDictionary();


    alert(
        "Question successfully added and saved!"
    );


   
    document.getElementById("wordInput").value = "";

    document.getElementById("definitionInput").value = "";

}

function showSuggestions() {

    let searchInput =
        document.getElementById("searchInput");

    let suggestions =
        document.getElementById("suggestions");


    let searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    
    if (searchText === "") {

        suggestions.innerHTML = "";

        return;
    }


    let matches = [];

    
    for (let question in dictionary) {

        if (question.includes(searchText)) {

            matches.push(question);

        }

    }


    
    if (matches.length === 0) {

        suggestions.innerHTML =
            "<p>No possible questions found.</p>";

        return;
    }


    suggestions.innerHTML = "";


    matches.forEach(function(question) {

        let suggestion =
            document.createElement("div");


        suggestion.className =
            "suggestion";


        suggestion.textContent =
            question;


        suggestion.onclick = function() {

            searchInput.value = question;

            suggestions.innerHTML = "";

            searchWord();

        };


        suggestions.appendChild(
            suggestion
        );

    });

}