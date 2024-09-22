Scene, Kamera, Renderer:

scene: Tempat semua objek 3D disusun.
camera: Menggunakan kamera perspektif untuk memberikan ilusi depth
renderer: Komponen WebGL yang menggambar objek ke layar. Ukurannya disesuaikan dengan ukuran window browser.
Pencahayaan:

ambientLight: Cahaya soft yg menyinari screen
directionalLight: Cahaya terarah seperti sinar matahari, yang memberikan shadow.
Objek 3D (Geometri):

Cube, Cylinder, dan Cone dibuat menggunakan geometri standar.
Lathe Geometry: Objek simetris yang dibuat dengan memutar beberapa titik 2D di sepanjang sumbu vertikal, membentuk objek melingkar seperti vas.
Semua objek menggunakan material dengan tekstur (gambar diterapkan pada permukaan objek).
Tekstur:

TextureLoader digunakan untuk memuat gambar yang diaplikasikan ke objek 3D sebagai tekstur, meningkatkan tampilan visual objek.
Animasi:

Pada fungsi animate(), objek diberi rotasi terus-menerus pada sumbu X dan Y, membuat mereka berputar.
Responsive Resize:

Event listener untuk memperbarui ukuran kamera dan renderer saat window browser diubah ukurannya, memastikan tampilan selalu responsif.

Screenshot : 

![image](https://github.com/user-attachments/assets/1e1f5890-9acf-42d1-82c8-5c4b07b4264d)
![image](https://github.com/user-attachments/assets/183a4dc1-03b2-4bcb-9da2-b1558865fa4b)

