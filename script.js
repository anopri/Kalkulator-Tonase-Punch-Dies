// Perbarui form saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
    updateForm();
});

function updateForm() {
    const shape = document.getElementById('shape').value;
    const shapes = ['obround', 'square', 'round', 'lainya'];

    shapes.forEach(s => {
        document.getElementById(`${s}-inputs`).style.display = shape === s ? 'block' : 'none';
    });
}

function calculateTonase(shape, values) {
    const { panjang, lebar, sisi, diameter, panjangTotal, thick, material, jumlahLubang } = values;
    let tonase;

    switch (shape) {
        case 'obround':
            tonase = (((lebar * Math.PI) + ((panjang - lebar) * 2)) * thick * material / 10000) * jumlahLubang;
            break;
        case 'square':
            tonase = (sisi * 4 * thick * material / 10000) * jumlahLubang;
            break;
        case 'round':
            tonase = (diameter * Math.PI * thick * material / 10000) * jumlahLubang;
            break;
        case 'lainya':
            tonase = (panjangTotal * thick * material / 10000) * jumlahLubang;
            break;
        default:
            tonase = 0;
    }

    return tonase;
}

function addCalculation() {
    const shape = document.getElementById('shape').value;
    const thick = parseFloat(document.getElementById('thick').value);
    const jumlahLubang = parseInt(document.getElementById('jumlah-lubang').value);
    const material = parseFloat(document.getElementById('material').value);

    let values = { thick, material, jumlahLubang };

    switch (shape) {
        case 'obround':
            values.panjang = parseFloat(document.getElementById('panjang').value);
            values.lebar = parseFloat(document.getElementById('lebar').value);
            break;
        case 'square':
            values.sisi = parseFloat(document.getElementById('sisi').value);
            break;
        case 'round':
            values.diameter = parseFloat(document.getElementById('diameter').value);
            break;
        case 'lainya':
            values.panjangTotal = parseFloat(document.getElementById('panjang-total').value);
            break;
    }

    if (Object.values(values).some(val => val <= 0)) {
        alert("Semua input harus lebih dari 0");
        return;
    }

    const tonase = calculateTonase(shape, values);

    const calculationsDiv = document.getElementById('calculations');
    const calculationText = `Model: ${shape.toUpperCase()}, Tonnage: ${tonase.toFixed(2)} Ton-Force`;
    const calculationElement = document.createElement('div');
    calculationElement.innerText = calculationText;
    calculationsDiv.appendChild(calculationElement);

    const totalTonase = Array.from(calculationsDiv.children)
        .reduce((total, child) => total + parseFloat(child.innerText.split('Tonnage: ')[1]), 0);

    document.getElementById('total-result').innerText = `Total Tonnage: ${totalTonase.toFixed(2)} Ton-Force`;
}
