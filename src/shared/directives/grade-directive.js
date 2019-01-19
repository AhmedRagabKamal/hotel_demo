export default function (element, binding) {
  const { grade } = binding.value;
  switch (true) {
    case grade >= 7 && grade < 8:
      element.textContent = 'Good';
      break;
    case grade >= 8 && grade < 9:
      element.textContent = 'Very Good';
      break;
    case grade >= 9:
      element.textContent = 'Excellent';
      break;
    default:
      element.textContent = 'Accepted';
  }
}
