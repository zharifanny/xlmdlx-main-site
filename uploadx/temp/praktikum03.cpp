// kode praktikum 3 grafika komputer
// adhi prahara. 2018

// deklarasikan semua header disini
#include <windows.h>
#include <glut.h>
#include <math.h>

// inisialisasi variabel untuk transformasi seperti translasi, rotasi atau scaling
float angle = 0.0f;					// sudut transformasi kamera
float posX = 0.0f, rotX =  0.0f;	// posisi kamera di sumbu X
float posY = 0.0f, rotY =  0.0f;	// posisi kamera di sumbu Y
float posZ = 5.0f, rotZ = -1.0f;	// posisi kamera di sumbu Z

float objectAngleX = 0.0f;			// sudut tranformasi obyek di sumbu X
float objectAngleY = 0.0f;			// sudut tranformasi obyek di sumbu Y
float objectAngleZ = 0.0f;			// sudut tranformasi obyek di sumbu Z

#define PHI 3.141592654		
#define SCREEN_WIDTH 480
#define SCREEN_HEIGHT 480

// container untuk membuat tipe data 3D (X, Y, Z)
struct Vec3 
{
	float X; float Y; float Z;
	Vec3(float x, float y, float z) { X = x; Y = y; Z = z; }
	//
	Vec3() { }
	~Vec3() { }
};

// enumerate untuk tipe interpolation
enum INTERP_TYPE 
{ 
	INTERP_POINTS = 0,
	INTERP_LINES = 1,
	INTERP_LINEAR = 2,
	INTERP_COSINE = 3,
	INTERP_CUBIC = 4
};

// fungsi untuk melakukan interpolasi linear dari dua titik
float linearInterpolate(float y0, float y1, float u)
{
	return (y0 * (1 - u) + y1 * u);
}

// fungsi untuk melakukan interpolasi cosine dari dua titik
float cosineInterpolate(float y0, float y1, float u)
{
	float cosineU = (1 - cos(u * PHI)) / 2;
	return (y0 * (1 - cosineU) + y1 * cosineU);
}

// fungsi untuk melakukan interpolasi cubic dari dua titik
float cubicInterpolate(float y0, float y1, float y2, float y3, float u)
{
	float a = y3 - y2 - y0 + y1;
	float b = 2 * y0 - 2 * y1  - y3 + y2;
	float c = y2 - y0;
	float d = y1;

	return(a*u*u*u + b*u*u + c*u + d);
}

// gambar garis hasil interpolasi
// point1 adalah titik awal
// point2 adalah titik akhir
// n adalah jumlah titik yang dibuat
// type adalah tipe interpolasi yang digunakan
void drawInterpolation(
	Vec3 point0,
	Vec3 point1, 
	Vec3 point2, 
	Vec3 point3,
	int n, 
	INTERP_TYPE type1, 
	INTERP_TYPE type2)
{
	float u = 0;
	float stepU = 1.0f  / n; // kenaikan u
	float stepX = fabs(point2.X - point1.X) / n; // kenaikan x
	float pX = point1.X, pY = point1.Y, pZ = point1.Z; // titik awal
	
	// mulai menggambar titik-titik
	glPointSize(5);
	// bila menggambar titik
	if (type1 == INTERP_POINTS)
		glBegin(GL_POINTS);
	// bila menggambar garis
	else if (type1 == INTERP_LINES)
		glBegin(GL_LINES);
	for (int i = 0; i < n; i++)
	{
		glVertex3f(pX, pY, pZ);
		pX = pX + stepX;
		u = u + stepU;
		// bila interpolasi linear
		if (type2 == INTERP_LINEAR)
			pY = linearInterpolate(point1.Y, point2.Y, u);
		// bila interpolasi cosine
		else if (type2 == INTERP_COSINE)
			pY = cosineInterpolate(point1.Y, point2.Y, u);
		// bila interpolasi cubic 
		else if (type2 == INTERP_CUBIC)
			pY = cubicInterpolate(point0.Y, point1.Y, point2.Y, point3.Y, u);
		glVertex3f(pX, pY, pZ);
	}
	glEnd();
}

// fungsi untuk menggambar obyek kubus
void drawObject()
{
	// obyek bisa dimasukkan diantara glPushMatrix() dan glPopMatrix() 
	// fungsinya agar obyek tidak terpengaruh atau mempengaruhi obyek lain
	// saat diwarnai, ditransformasi dan sebagainya
	glPushMatrix();

	// operasi transformasi rotasi obyek ke arah kanan-kiri
	glRotatef(objectAngleY, 0.0f, 1.0f, 0.0f);

	glPushMatrix();

	// operasi transformasi rotasi obyek ke arah atas-bawah
	glRotatef(objectAngleX, 1.0f, 0.0f, 0.0f);

	// set warna obyek ke warna hijau (0.0f, 1.0f, 0.0f)
	glColor3f(0.0f, 1.0f, 0.0f);

	// kuadran 1
	Vec3 point0 = Vec3(-300.0f, -200.0f, 0.0f);
	Vec3 point1 = Vec3(-200.0f, -100.0f, 0.0f);
	Vec3 point2 = Vec3( 200.0f,  0.0f, 0.0f);
	Vec3 point3 = Vec3( 300.0f,  200.0f, 0.0f);
	//drawInterpolation(point0, point1, point2, point3, 4, INTERP_POINTS, INTERP_LINEAR);
	//drawInterpolation(point0, point1, point2, point3, 4, INTERP_LINES, INTERP_LINEAR);
	//drawInterpolation(point0, point1, point2, point3, 10, INTERP_POINTS, INTERP_COSINE);
	//drawInterpolation(point0, point1, point2, point3, 10, INTERP_LINES, INTERP_COSINE);
	drawInterpolation(point0, point1, point2, point3, 4, INTERP_POINTS, INTERP_CUBIC);
	drawInterpolation(point0, point1, point2, point3, 4, INTERP_LINES, INTERP_CUBIC);

	glPopMatrix();

	glPopMatrix();
}

// taruh semua obyek yang akan digambar di fungsi display()
void display()
{
	// bersihkan dan reset layar dan buffer
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
	glLoadIdentity();

	// posisikan kamera pandang
	// dalam hal ini sumbu Y ada diatas dan posisi kamera pandang di (posX, posY, posZ)
	gluLookAt(posX, posY, posZ, posX + rotX, posY + rotY, posZ + rotZ, 0.0f, 1.0f, 0.0f);

	// panggil fungsi untuk menggambar obyek
	drawObject();
	
	// tampilkan obyek ke layar
	glutSwapBuffers();
}

// inisialisasikan variabel, pencahayaan, tekstur dan pengaturan kamera pandang di fungsi init()
void init(void)
{
	// inisialisasi warna latar belakang layar dalam hal ini warna putih (1.0, 1.0, 1.0, 0.0)
	glClearColor(0.0, 0.0, 0.0, 0.0);
	glEnable(GL_DEPTH_TEST);				// mengaktifkan depth buffer
	glMatrixMode(GL_PROJECTION);		
	glLoadIdentity();
	//gluPerspective(45.0, 1.0, 1.0, 100.0);	// set proyeksi ke perspektif
	// set ke proyeksi orthogonal
	glOrtho((GLfloat)-SCREEN_WIDTH/2, (GLfloat)SCREEN_WIDTH/2, 
		(GLfloat)-SCREEN_HEIGHT/2, (GLfloat)SCREEN_HEIGHT/2, 1.0, 100.0);
	glMatrixMode(GL_MODELVIEW);				
	glLoadIdentity();						
	// inisialisasi kamera pandang
	gluLookAt(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
}

// fungsi ini digunakan bila layar akan diresize (default)
void reshape(int w, int h)
{
	glViewport(0, 0, (GLsizei)w, (GLsizei)h);
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	//gluPerspective(45, (GLfloat)w / (GLfloat)h, 1.0, 100.0);
	glOrtho((GLfloat)-w/2, (GLfloat)w/2, (GLfloat)-h/2, (GLfloat)h/2, 1.0, 100.0);
	glMatrixMode(GL_MODELVIEW);
}

// fungsi untuk mengatur masukan dari keyboard 
// untuk arah kiri, kanan, atas, bawah, PgUp, dan PgDn
void keyboard(int key, int x, int y)
{
	float fraction = 0.1f;

	switch (key) 
	{
	// masukkan perintah disini bila tombol kiri ditekan
	case GLUT_KEY_LEFT:
		// dalam hal ini perintah rotasi obyek ke kiri sebanyak 1 derajat 
		objectAngleY -= 1.0f;
		glutPostRedisplay();	// update obyek
		break;
	// masukkan perintah disini bila tombol kanan ditekan
	case GLUT_KEY_RIGHT:		
		// dalam hal ini perintah rotasi obyek ke kanan sebanyak 1 derajat 
		objectAngleY += 1.0f;
		glutPostRedisplay();	// update obyek
		break;
	// masukkan perintah disini bila tombol atas ditekan
	case GLUT_KEY_UP:		
		// dalam hal ini perintah rotasi obyek ke atas sebanyak 1 derajat 
		objectAngleX -= 1.0f;
		glutPostRedisplay();	// update obyek
		break;
	// masukkan perintah disini bila tombol bawah ditekan
	case GLUT_KEY_DOWN:		
		// dalam hal ini perintah rotasi obyek ke bawah sebanyak 1 derajat 
		objectAngleX += 1.0f;
		glutPostRedisplay();	// update obyek
		break;
	// zoom in
	case GLUT_KEY_PAGE_UP:
		// masukkan perintah disini bila tombol PgUp ditekan
		posX += rotX * fraction;		
		posZ += rotZ * fraction;
		glutPostRedisplay();	// update obyek
		break;
	// zoom out
	case GLUT_KEY_PAGE_DOWN:
		// masukkan perintah disini bila tombol PgDn ditekan
		posX -= rotX * fraction;
		posZ -= rotZ * fraction;
		glutPostRedisplay();	// update obyek
		break;
	}
}

// timer untuk animasi (gunakan bila perlu)
void timer(int value)
{
	glutPostRedisplay();
	glutTimerFunc(55, timer, 0);
}

// program utama
int main(int argc, char** argv)
{
	// inisialisasi jendela OpenGL
	// GLUT_SINGLE berarti memakai single buffer
	// GLUT_DOUBLE berarti memakai double buffer
	// GLUT_RGB berarti mode tampilan yang dipakai RGB
	// GLUT_RGBA berarti mode tampilan yang dipakai RGBA
	// GLUT_DEPTH berarti memakai depth buffer
	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA | GLUT_DEPTH);

	// set ukuran jendela tampilan
	glutInitWindowSize(SCREEN_WIDTH, SCREEN_HEIGHT); // besarnya jendela dalam piksel dalam hal ini 300x300
	glutInitWindowPosition(100, 100);	// posisi jendela dilayar komputer dalam piksel
	// judul jendela (wajib diubah dengan informasi NAMA / NIM - JUDUL PRAKTIKUM masing-masing)
	glutCreateWindow("NAMA / NIM - PRAKTIKUM 03 GRAFIKA KOMPUTER");
	
	// panggil fungsi init untuk inisialisasi awal
	init();

	// event handler untuk display, reshape dan keyboard
	glutDisplayFunc(display);   // display
	glutReshapeFunc(reshape);   // reshape
	glutSpecialFunc(keyboard);  // keyboard
	//glutTimerFunc(0, timer, 0); // aktifkan timer bila perlu

	// looping
	glutMainLoop();

	return 0;
}