document.querySelectorAll('.save-note-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const container = this.parentElement;
        const noteInput = container.querySelector('.notes-input');
        const eventCell = this.closest('td');
        const noteText = noteInput.value.trim();
        const timeSlot = eventCell.closest('tr').children[0].textContent;
        const dayIndex = Array.from(eventCell.parentElement.children).indexOf(eventCell) - 1;
        const dateKey = `${getWeekDates(currentWeekOffset)[dayIndex].date}_${timeSlot}`;
        const eventName = eventCell.querySelector('.event-content').textContent.trim();

        if (noteText === '') {
            delete notesData[dateKey];
            delete notesData[`${dateKey}_completed`];
            delete notesData[`${dateKey}_eventName`];

            const noteDiv = eventCell.querySelector('.event-note');
            if (noteDiv) {
                noteDiv.remove();
            }

            const notesBtn = eventCell.querySelector('.notes-btn');
            notesBtn.textContent = 'Notes';

            container.style.display = 'none';
            notesBtn.style.display = 'inline';

            updateIncompleteNotesCount(getWeekDates(currentWeekOffset));
            return;
        }

        notesData[dateKey] = noteText;
        notesData[`${dateKey}_completed`] = false;
        notesData[`${dateKey}_eventName`] = eventName;

        let noteDiv = eventCell.querySelector('.event-note');
        if (noteDiv) {
            noteDiv.innerHTML = `<input type="checkbox" class="complete-note-checkbox" data-note-key="${dateKey}">${noteText}`;
        } else {
            noteDiv = document.createElement('div');
            noteDiv.className = 'event-note';
            noteDiv.innerHTML = `<input type="checkbox" class="complete-note-checkbox" data-note-key="${dateKey}">${noteText}`;
            eventCell.insertBefore(noteDiv, eventCell.querySelector('.notes-btn'));
        }

        const notesBtn = eventCell.querySelector('.notes-btn');
        notesBtn.textContent = 'Edit';

        container.style.display = 'none';
        notesBtn.style.display = 'inline';

        addCompleteNoteListener();
        updateIncompleteNotesCount(getWeekDates(currentWeekOffset));
    });
});
