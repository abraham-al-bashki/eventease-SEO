<template>
  <div>
    <!-- Knapp för att öppna popup-dialogen -->
    <button @click="showCreateModal" class="button-with-icon">
      <span class="notes">Anteckningar</span>
      <span class="icon-wrapper">
        <img
          src="./../assets/pratbubblan.png"
          alt="Pratbubbla"
          class="note-icon"
        />
      </span>
    </button>

    <!-- Popup-dialog för att skapa ny artikel -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="hideCreateModal">&times;</span>
        <h2>Anteckningar</h2>
        <div
          class="create-article"
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <input
            type="text"
            placeholder="Titel"
            v-model="newArticle.title"
            class="title-input"
          />
          <textarea
            placeholder="Innehåll"
            v-model="newArticle.content"
            class="text"
          />
          <button @click="saveNewArticle" class="saveArticle">Spara</button>
        </div>

        <!-- Visa de skrivna anteckningarna under textfälten -->
        <div class="saved-content">
          <ul class="notes-list">
            <li
              v-for="(article, index) in articles"
              :key="article.id"
              @mouseover="setHovered(index)"
              @mouseleave="unsetHovered()"
            >
              <!-- Visa titeln och innehållet först, och sedan datum och tid bredvid -->
              <span>
                <!-- Titel -->
                <div
                  class="designtitle"
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <strong v-if="!article.editMode">{{ article.title }}</strong>
                  <input
                    v-else
                    type="text"
                    v-model="article.title"
                    class="title-input"
                  />

                  <!-- Innehåll -->
                  <br />
                  <span v-if="!article.editMode">{{ article.content }}</span>
                  <textarea v-else v-model="article.editedContent" />
                  <br />
                  <small>{{ formatDateTime(article.createdDate) }}</small>
                </div>

                <!-- Kryssknapp för att radera artikeln -->
                <span
                  class="deletenote"
                  @click="deleteArticle(index)"
                  title="Radera"
                  >&times;</span
                >

                <!-- Knapp för redigering -->
                <button
                  v-if="!article.editMode && isHovered === index"
                  @click="toggleEditMode(index)"
                  class="edit-button"
                >
                  Redigera
                </button>
                <button
                  v-else-if="article.editMode && isHovered === index"
                  @click="saveEditedArticle(index)"
                  class="edit-button"
                >
                  Spara
                </button>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        articles: [],
        showModal: false, // Flagga för att visa popup-dialogen
        newArticle: {
          title: '',
          content: ''
        },
        selectedArticlePopup: null, // Den valda artikeln för popup
        isHovered: null // Index för artikeln som hålls över
      };
    },
    methods: {
      // Metod för att visa popup-dialogen
      showCreateModal() {
        this.showModal = true;
      },

      // Metod för att dölja popup-dialogen
      hideCreateModal() {
        this.showModal = false;
      },
      saveNewArticle() {
        let currentDate = new Date(); // Skapa ett nytt Date-objekt för att hämta aktuell tid
        let formattedDate = currentDate.toLocaleString(); // Använd toLocaleString för att formatera datum och tid
        const newId = Date.now(); // Generera ett unikt ID för den nya artikeln
        this.articles.push({
          id: newId, // Lägg till det unika ID:t till den nya artikeln
          title: this.newArticle.title,
          content: this.newArticle.content,
          titleEditMode: false,
          editMode: false,
          editedContent: '',
          createdDate: formattedDate // Spara den formaterade tiden för den nya anteckningen
        });
        this.newArticle.title = '';
        this.newArticle.content = '';
        // this.showModal = false; // Låt popup-dialogen vara öppen efter att artikeln har sparats
      },
      formatDateTime(dateTimeString) {
        // Konvertera datum och tid till lämpligt format
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return (
          'Skapad den ' +
          new Date(dateTimeString).toLocaleDateString(undefined, options)
        );
      },
      deleteArticle(index) {
        this.articles.splice(index, 1); // Tar bort artikeln från listan med hjälp av dess index
      },
      setHovered(index) {
        this.isHovered = index;
      },
      unsetHovered() {
        this.isHovered = null;
      },
      toggleEditMode(index) {
        this.articles[index].editMode = true;
        this.articles[index].editedContent = this.articles[index].content;
      },
      saveEditedArticle(index) {
        this.articles[index].content = this.articles[index].editedContent;
        this.articles[index].editMode = false;
      },
      onEnter() {
        this.saveNewArticle();
      }
    }
  };
</script>

<style scoped>
  button {
    background-color: #2a332c;
    box-shadow: 2px 2px 5px #161616, -2px -2px 2px #a6a6a6;
  }

  .modal {
    z-index: 20;
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    min-height: 100%;
    width: 100%;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    background-color: #2a332c;
    cursor: grab;
    border: 10px #2a332c;
    max-height: 700px;
    max-width: 300px;
    height: 400px;
    overflow-y: auto;
    width: 50%;
    top: 43%;
    left: 20px;
    overflow: auto;
    border-radius: 10%;
    box-shadow: 2px 2px 7px 1px black;
    z-index: 10;
  }
  .notes-list {
    list-style-type: none;
    padding: 0;
  }

  .notes-list li {
    cursor: pointer;
    margin-bottom: 10px;
    position: relative;
  }
  .close {
    position: relative;
    top: 5px;
    right: 80px;
    cursor: pointer;
    font-size: 24px;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  li:hover {
    background: #3a423c;
  }

  li {
    padding-top: 5px;
    box-shadow: 2px 2px 5px #161616, -2px -2px 2px #a6a6a6;
    border-radius: 2%;
    background-color: #3a423c;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #212722;
    border-radius: 4px;
    width: 2px;
  }
  .deletenote {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 15px;
    cursor: pointer;
    color: white;
  }
  .edit-button {
    padding: 5px 5px;
    margin-right: 3%;
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 20px;
    box-shadow: 2px 2px 7px 1px black;
  }
  .saveArticle {
    font-size: 17px;
    padding: 2px 5px;
    margin-top: 16px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    box-shadow: 2px 2px 7px 1px black;
  }
  .title-input {
    width: 75px;
    display: flex;
    align-items: center;
  }
  .note-icon {
    width: 50px;
    height: auto;
    padding: 5px 5px;
    padding-bottom: -80%;
  }
  .button-with-icon {
    width: 125px;
    padding-left: 9%;
  }

  h2 {
    margin-top: -2px;
  }

  .create-article {
    margin-top: -5px;
  }

   @media (min-width: 730px) {
    .close {
    position: relative;
    top: 5px;
    right: 120px;
    cursor: pointer;
    font-size: 24px;
   }
    }
</style>