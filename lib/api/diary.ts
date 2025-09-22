

export const getDiaryEntries = async () => {
  return allDiaryEntries;
};

export const getEmotions = async () => {
  return emotions.data;
};


const emotions = {
  "status": 200,
  "message": "Successfully fetched emotions!",
  "data": [
    {
      "_id": "6895bd86a5c677999ed2ae14",
      "title": "Joi"
    },
    {
      "_id": "6895bd86a5c677999ed2ae15",
      "title": "Joi"
    },
    {
      "_id": "6895bd86a5c677999ed2ae16",
      "title": "Joi"
    },
    {
      "_id": "6895bd86a5c677999ed2ae17",
      "title": "Joi"
    },
  ]
}


const allDiaryEntries = [
    {
        _id: "68cd0eb8dad8594a727eecb",
        title: "A wonderful day1",
        description: "1 I had a great walk in the park, enjoyed the sunshine, and felt really happy and relaxed.",
        date: "2025-09-19T20:45:31.607Z",
        userId: "68caf43ae72474007ccba4c4",
        emotions: [
          {
            "_id": "6895bd86a5c677999ed2ae27",
            "title": "Joy"
          },
          {
            "_id": "6895bd86a5c677999ed2ae28",
            "title": "Joy"
          }
        ],
        createdAt: "2025-09-19T20:45:31.615Z",
        updatedAt: "2025-09-19T20:45:31.615Z"
    },
        {
        _id: "78cd0eb8dad8594a727eecb",
        title: "A wonderful day2",
        description: "2 I had a great walk in the park, enjoyed the sunshine, and felt really happy and relaxed.",
        date: "2025-09-19T20:45:31.607Z",
        userId: "68caf43ae72474007ccba4c4",
        emotions: [
          {
            "_id": "6895bd86a5c677999ed2ae29",
            "title": "Joy"
          }
        ],
        createdAt: "2025-09-19T20:45:31.615Z",
        updatedAt: "2025-09-19T20:45:31.615Z"
    },
        {
        _id: "88cd0eb8dad8594a727eecb",
        title: "A wonderful day3",
        description: "3 I had a great walk in the park, enjoyed the sunshine, and felt really happy and relaxed.",
        date: "2025-09-19T20:45:31.607Z",
        userId: "68caf43ae72474007ccba4c4",
        emotions: [
          {
            "_id": "6895bd86a5c677999ed2ae20",
            "title": "Joy"
          }
        ],
        createdAt: "2025-09-19T20:45:31.615Z",
        updatedAt: "2025-09-19T20:45:31.615Z"
    }
]