document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const totalScoreElement = document.getElementById('totalScore');
    const statusElement = document.getElementById('status');
    let printLink = document.getElementById("print-button");
    let container = document.getElementById("print-button-div");

    printLink.addEventListener("click", event => {
        event.preventDefault();
        printLink.style.display = "none";
        window.print();
    }, false);

    container.addEventListener("click", event => {
        printLink.style.display = "flex";
    }, false);

    sections.forEach(section => {
        const selects = section.querySelectorAll('.value-select');
        selects.forEach(select => {
            select.addEventListener('change', updateTotalScore);
            select.addEventListener('change', updateSectionScore);
        });
    });

    function updateTotalScore() {
        let totalScore = 0;
        let maxScore = 0;

        sections.forEach(section => {
            const selects = section.querySelectorAll('.value-select');
            selects.forEach(select => {
                const value = select.value;
                if (value!== 'N/A') {
                    const intValue = parseInt(value, 10);
                    if (!isNaN(intValue)) {
                        maxScore += 1; // Each valid select contributes a maximum of 1 to the score
                        totalScore += intValue;
                    }
                }
            });
        });

        const percentage = maxScore > 0? (totalScore / maxScore) * 100 : 0;
        totalScoreElement.textContent = percentage.toFixed(2) + '%';

        if (percentage >= 75) {
            statusElement.textContent = 'Pass';
            statusElement.classList.add('pass');
            statusElement.classList.remove('fail');
        } else {
            statusElement.textContent = 'Fail';
            statusElement.classList.add('fail');
            statusElement.classList.remove('pass');
        }
    }

    function updateSectionScore(event) {
        const section = event.target.closest('.section');
        const sectionScoreElement = section.querySelector('#' + section.id + '-score');
        let sectionScore = 0;
        let sectionMaxScore = 0;

        const selects = section.querySelectorAll('.value-select');
        selects.forEach(select => {
            const value = select.value;
            if (value!== 'N/A') {
                const intValue = parseInt(value, 10);
                if (!isNaN(intValue)) {
                    sectionMaxScore += 1; // Each valid select contributes a maximum of 1 to the score
                    sectionScore += intValue;
                }
            }
        });

        const sectionPercentage = sectionMaxScore > 0? (sectionScore / sectionMaxScore) * 100 : 0;
        sectionScoreElement.textContent = sectionPercentage.toFixed(2) + '%';
    }

    // Initial calculation
    updateTotalScore();
    sections.forEach(section => updateSectionScore({ target: section }));
});
