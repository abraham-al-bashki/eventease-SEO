<template>
  <div>
    <h1>
      Events for
      {{ selectedDate }}
    </h1>
    <ul>
      <template v-for="eventsThatDay in filteredEvents">
        <li v-for="eventThatTime in Object.entries(eventsThatDay)">
          <div>
            <p>Time: {{ eventThatTime[0] }}</p>
            <p>Name: {{ eventThatTime[1].namn }}</p>
            <p>Location: {{ eventThatTime[1].plats }}</p>
            <p>Info: {{ eventThatTime[1].info }}</p>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: {
        kategori: {
          filosofi: {
            year: {
              2023: {
                months: {
                  3: {
                    dates: {
                      22: {
                        time: {
                          "13.00": {
                            namn: "Filosofika månad 3",
                            plats: "Filosofiska instutitionen",
                            info: "quine vs carnap",
                          },
                          "14.00": {
                            namn: "Filosofika månad 3",
                            plats: "Filosofiska instutitionen",
                            info: "quine vs carnap",
                          },
                        },
                      },
                    },
                  },
                  2: {
                    dates: {
                      12: {
                        time: {
                          "13.00": {
                            namn: "Filosofika månad 2",
                            plats: "Filosofiska instutitionen",
                            info: "quine vs carnap",
                          },
                        },
                      },
                      22: {
                        time: {
                          "13.00": {
                            namn: "Filosofika månad 2",
                            plats: "Filosofiska instutitionen",
                            info: "quine vs carnap",
                          },
                        },
                      },
                    },
                  },
                  1: {
                    dates: {
                      22: {
                        time: {
                          "13.00": {
                            namn: "Filosofika månad 1",
                            plats: "Filosofiska instutitionen",
                            info: "quine vs carnap",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      selectedDate: "2023-03-22", // Change this to your desired date
    };
  },
  computed: {
    filteredEvents() {
      const selectedYear = this.selectedDate.split("-")[0];
      const selectedMonth =
        this.selectedDate.split("-")[1][0] === "0"
          ? this.selectedDate.split("-")[1].slice(1, 2)
          : this.selectedDate.split("-")[1];
      const selectedDay =
        this.selectedDate.split("-")[2][0] === "0"
          ? this.selectedDate.split("-")[2].slice(1, 2)
          : this.selectedDate.split("-")[2];

      if (
        this.events.kategori?.filosofi?.year?.[selectedYear]?.months?.[
          selectedMonth
        ]?.dates?.[selectedDay]
      ) {
        // console.log(
        //   this.events.kategori?.filosofi?.year?.[selectedYear]?.months?.[
        //     selectedMonth
        //   ]?.dates?.[selectedDay]
        // );
        return Object.values(
          this.events.kategori?.filosofi?.year?.[selectedYear]?.months?.[
            selectedMonth
          ]?.dates?.[selectedDay] || {}
        );
      } else {
        return [];
      }
    },
  },
};
</script>
