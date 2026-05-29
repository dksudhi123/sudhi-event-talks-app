document.addEventListener('DOMContentLoaded', () => {
    const talksData = [
        {
            title: "Introduction to AI in Web Development",
            speakers: ["Alice Johnson"],
            category: ["AI", "Web Development", "Frontend"],
            durationMinutes: 60,
            description: "Explore how artificial intelligence is transforming modern web development, from intelligent user interfaces to automated content generation."
        },
        {
            title: "Mastering Microservices with Node.js",
            speakers: ["Bob Williams", "Charlie Brown"],
            category: ["Backend", "Node.js", "Microservices"],
            durationMinutes: 60,
            description: "A deep dive into designing, building, and deploying scalable microservices using Node.js and best practices."
        },
        {
            title: "Advanced CSS Layout Techniques",
            speakers: ["Diana Prince"],
            category: ["Frontend", "CSS", "Design"],
            durationMinutes: 60,
            description: "Unlock the full potential of CSS Grid and Flexbox for creating complex and responsive layouts with ease."
        },
        {
            title: "Data Visualization with D3.js",
            speakers: ["Eve Adams"],
            category: ["Frontend", "Data Science", "JavaScript"],
            durationMinutes: 60,
            description: "Learn to create stunning and interactive data visualizations using the powerful D3.js library."
        },
        {
            title: "Security Best Practices for Web Applications",
            speakers: ["Frank White"],
            category: ["Security", "Web Development"],
            durationMinutes: 60,
            description: "Understand common web vulnerabilities and implement robust security measures to protect your applications and users."
        },
        {
            title: "Cloud Native Architectures on GCP",
            speakers: ["Grace Hopper"],
            category: ["Cloud", "DevOps", "Backend"],
            durationMinutes: 60,
            description: "An overview of building and deploying scalable, resilient applications on Google Cloud Platform using cloud-native patterns."
        }
    ];

    const eventStartTime = 10 * 60; // 10:00 AM in minutes from midnight
    const lunchBreakDuration = 60; // 1 hour
    const transitionDuration = 10; // 10 minutes

    let currentTime = eventStartTime;
    const scheduleItems = [];

    talksData.forEach((talk, index) => {
        const talkStartTime = currentTime;
        const talkEndTime = currentTime + talk.durationMinutes;

        scheduleItems.push({
            type: 'talk',
            ...talk,
            startTime: formatMinutesToTime(talkStartTime),
            endTime: formatMinutesToTime(talkEndTime)
        });

        currentTime = talkEndTime;

        // Add transition after each talk, except the last one or before lunch
        if (index < talksData.length - 1) {
            // Check if next item is supposed to be lunch or another talk
            const nextTalkStartsAfterLunch = (index === 1); // After 2nd talk, assuming lunch after 2nd talk

            if (!nextTalkStartsAfterLunch) {
                currentTime += transitionDuration;
            }
        }
        
        // Insert lunch break after the second talk
        if (index === 1) {
            const lunchStartTime = currentTime + transitionDuration;
            const lunchEndTime = lunchStartTime + lunchBreakDuration;
            scheduleItems.push({
                type: 'break',
                title: 'Lunch Break',
                durationMinutes: lunchBreakDuration,
                startTime: formatMinutesToTime(lunchStartTime),
                endTime: formatMinutesToTime(lunchEndTime)
            });
            currentTime = lunchEndTime; // Update current time after lunch
            currentTime += transitionDuration; // Add transition after lunch
        }
    });

    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('category-search');
    const noTalksMessage = document.getElementById('no-talks-message');

    function formatMinutesToTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${displayHours}:${mins < 10 ? '0' : ''}${mins} ${ampm}`;
    }

    function renderSchedule(filteredTalks) {
        scheduleContainer.innerHTML = ''; // Clear previous schedule

        if (filteredTalks.length === 0) {
            noTalksMessage.classList.remove('hidden');
            return;
        } else {
            noTalksMessage.classList.add('hidden');
        }

        filteredTalks.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('schedule-item');

            if (item.type === 'talk') {
                itemElement.innerHTML = `
                    <span class="time">${item.startTime} - ${item.endTime}</span>
                    <h2>${item.title}</h2>
                    <p class="speakers">Speakers: ${item.speakers.join(', ')}</p>
                    <div class="category-tags">
                        ${item.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                    <p>${item.description}</p>
                `;
            } else if (item.type === 'break') {
                itemElement.classList.add('lunch-break');
                itemElement.innerHTML = `
                    <span class="time">${item.startTime} - ${item.endTime}</span>
                    <h2>${item.title}</h2>
                `;
            }
            scheduleContainer.appendChild(itemElement);
        });
    }

    // Initial render of the full schedule
    renderSchedule(scheduleItems);

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        if (searchTerm === '') {
            renderSchedule(scheduleItems); // Show all if search is empty
            return;
        }

        const filtered = scheduleItems.filter(item => 
            item.type === 'talk' && 
            item.category.some(cat => cat.toLowerCase().includes(searchTerm))
        );
        renderSchedule(filtered);
    });
});