const checks = [...document.querySelectorAll('input[name="difficulty"]')];
const count = document.getElementById('selectedCount');
function updateCount(){
  count.textContent = checks.filter(c => c.checked).length;
  document.querySelectorAll('.option').forEach(o => o.classList.toggle('selected', o.querySelector('input').checked));
}
checks.forEach(c => c.addEventListener('change', updateCount));
document.getElementById('assessmentForm').addEventListener('submit', e => {
  e.preventDefault();
  const selected = checks.filter(c => c.checked).map(c => c.value);
  const other = document.getElementById('other').value.trim();
  if (!selected.length && !other) {
    alert('Selecione pelo menos uma situação ou escreva outra dificuldade para continuar.');
    return;
  }
  localStorage.setItem('uniaColheSelections', JSON.stringify(selected));
  localStorage.setItem('uniaColheOther', other);
  localStorage.removeItem('uniaColhePlan');
  location.href = 'resultado.html';
});
updateCount();