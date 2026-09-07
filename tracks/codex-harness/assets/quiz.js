/* codex-harness track · 极简测验组件
   用法：
   <div class="quiz" data-quiz>
     <p class="quiz-question"><span class="tag">预测</span>问题文字</p>
     <button class="quiz-option" data-correct="false">选项 A</button>
     <button class="quiz-option" data-correct="true">选项 B</button>
     <div class="quiz-feedback">答错的解释文字（含正确答案的原理）。</div>
   </div>
   点击选项后：标色、锁定、展开反馈。 */

document.querySelectorAll("[data-quiz]").forEach((quiz) => {
  const options = quiz.querySelectorAll(".quiz-option");
  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (quiz.classList.contains("answered")) return;
      quiz.classList.add("answered");
      const correct = btn.dataset.correct === "true";
      btn.classList.add(correct ? "correct" : "wrong");
      if (!correct) {
        const right = quiz.querySelector('.quiz-option[data-correct="true"]');
        if (right) right.classList.add("correct");
      }
      options.forEach((o) => (o.disabled = true));
      const fb = quiz.querySelector(".quiz-feedback");
      if (fb) fb.classList.add("shown");
    });
  });
});
