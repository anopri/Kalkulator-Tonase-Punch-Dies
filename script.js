// script.js

// Fungsi untuk memperbarui form berdasarkan bentuk yang dipilih
function updateForm() {
    const shape = document.getElementById('shape').value;
    const shapes = ['obround', 'square', 'round', 'lainya'];

    shapes.forEach(s => {
        document.getElementById(`${s}-inputs`).style.display = shape === s ? 'block' : 'none';
    });
}

// Fungsi untuk menghitung tonase berdasarkan bentuk
function calculateTonase(shape, values) {
    const { panjang, lebar, sisi, diameter, panjangTotal, thick, material, jumlahLubang } = values;
    let tonase;

    switch (shape) {
        case 'obround':
            tonase = (((lebar * 3.14) + ((panjang - lebar) * 2)) * thick * material / 10000) * jumlahLubang;
            break;
        case 'square':
            tonase = (sisi * 4 * thick * material / 10000) * jumlahLubang;
            break;
        case 'round':
            tonase = (diameter * 3.14 * thick * material / 10000) * jumlahLubang;
            break;
        case 'lainya':
            tonase = (panjangTotal * thick * material / 10000) * jumlahLubang;
            break;
        default:
            tonase = 0;
    }
    
    return tonase;
}

// Fungsi untuk menambahkan perhitungan ke dalam daftar
function addCalculation() {
    const shape = document.getElementById('shape').value;
    const thick = parseFloat(document.getElementById('thick').value);
    const jumlahLubang = parseInt(document.getElementById('jumlah-lubang').value);
    const material = parseFloat(document.getElementById('material').value);
    
    // Ambil nilai input tambahan berdasarkan bentuk
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

    // Validasi input
    if (Object.values(values).some(val => val <= 0)) {
        alert("Semua input harus lebih dari 0");
        return;
    }

    // Hitung tonase berdasarkan bentuk
    const tonase = calculateTonase(shape, values);

    // Tambahkan perhitungan ke dalam daftar
    const calculationsDiv = document.getElementById('calculations');
    const calculationText = `Bentuk: ${shape.toUpperCase()}, Tonase: ${tonase.toFixed(2)} Ton`;
    const calculationElement = document.createElement('div');
    calculationElement.innerText = calculationText;
    calculationsDiv.appendChild(calculationElement);

    // Tambahkan ke total
    const totalResultDiv = document.getElementById('total-result');
    const totalTonase = Array.from(calculationsDiv.children)
        .reduce((total, child) => total + parseFloat(child.innerText.split('Tonase: ')[1]), 0);
    totalResultDiv.innerText = `Total Tonase: ${totalTonase.toFixed(2)} Ton`;
}

// Perbarui form saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
    updateForm();
});