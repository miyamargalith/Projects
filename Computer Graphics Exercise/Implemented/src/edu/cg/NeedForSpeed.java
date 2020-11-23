package edu.cg;

import java.awt.Component;
import java.nio.FloatBuffer;
import java.util.List;

import javax.swing.JOptionPane;

import com.jogamp.opengl.GL2;
import com.jogamp.opengl.GLAutoDrawable;
import com.jogamp.opengl.GLEventListener;
import com.jogamp.opengl.glu.GLU;
import com.jogamp.opengl.util.FPSAnimator;

import edu.cg.algebra.Point;
import edu.cg.algebra.Vec;
import edu.cg.models.BoundingSphere;
import edu.cg.models.Car.Specification;
import edu.cg.models.Track;
import edu.cg.models.TrackSegment;
import edu.cg.models.Car.F1Car;

/**
 * An OpenGL 3D Game.
 *
 */
public class NeedForSpeed implements GLEventListener {
	private GameState gameState = null; // Tracks the car movement and orientation
	private F1Car car = null; // The F1 car we want to render
	private Vec carCameraTranslation = null; // The accumulated translation that should be applied on the car, camera
												// and light sources
	private Track gameTrack = null; // The game track we want to render
	private FPSAnimator ani; // This object is responsible to redraw the model with a constant FPS
	private Component glPanel; // The canvas we draw on.
	private boolean isModelInitialized = false; // Whether model.init() was called.
	private boolean isDayMode = true; // Indicates whether the lighting mode is day/night.
	private boolean isBirdseyeView = false; // Indicates whether the camera is looking from above on the scene or

	private double scale;
	private double[] carInitialPosition;


	public NeedForSpeed(Component glPanel) {
		this.glPanel = glPanel;
		gameState = new GameState();
		gameTrack = new Track();
		carCameraTranslation = new Vec(0.0);
		car = new F1Car();

		this.scale = 3.5; // scale value of the car from local to global coordinate system
		this.carInitialPosition = new double[] { 0.0, 0.5, -6.0 }; // cars coordinate in the begining of the track
	}

	@Override
	public void display(GLAutoDrawable drawable) {
		GL2 gl = drawable.getGL().getGL2();
		if (!isModelInitialized) {
			initModel(gl);
		}
		if (isDayMode) {
			gl.glClearColor(0.74f, 0.95f, 0.99f, 1.0f);
		} else {
			gl.glClearColor(0.12f, 0.20f, 0.64f, 1.0f);
		}
		gl.glClear(GL2.GL_COLOR_BUFFER_BIT | GL2.GL_DEPTH_BUFFER_BIT);
		gl.glMatrixMode(GL2.GL_MODELVIEW);
		gl.glLoadIdentity();
		// Step (1) Update the accumulated translation that needs to be
		// applied on the car, camera and light sources.
		updateCarCameraTranslation(gl);
		// Step (2) Position the camera and setup its orientation
		setupCamera(gl);
		// Step (3) setup the lights.
		setupLights(gl);
		// Step (4) render the car.
		renderCar(gl);
		// Step (5) render the track.
		renderTrack(gl);
		// Step (6) check collision. Note this has nothing to do with OpenGL.
		if (checkCollision()) {
			JOptionPane.showMessageDialog(this.glPanel, "Game is Over");
			this.gameState.resetGameState();
			this.carCameraTranslation = new Vec(0.0);
		}
	}

	/**
	 * @return Checks if the car intersects the one of the boxes on the track.
	 */
	private boolean checkCollision() {
		List<BoundingSphere> carSpheresList = this.car.getBoundingSpheres();
		List<BoundingSphere> trackBoundingSpheresList = gameTrack.getBoundingSpheres();
		BoundingSphere curCarSphere, curTrackSphere;
		double rotationVal = Math.toRadians(90 - this.gameState.getCarRotation());
		double sinRotationVal = Math.sin(rotationVal);
		double cosRotationVal = Math.cos(rotationVal);
		for(int i = 0; i < carSpheresList.size(); i++) {
			curCarSphere = carSpheresList.get(i);
			//scale
			curCarSphere.setRadius((curCarSphere.getRadius() * scale));
			// rotation
			double rotationX = cosRotationVal * curCarSphere.getCenter().x +
								0 * curCarSphere.getCenter().y +
								sinRotationVal * curCarSphere.getCenter().z;
			double rotationY = 0 * curCarSphere.getCenter().x +
								1 * curCarSphere.getCenter().y +
								0 * curCarSphere.getCenter().z;
			double rotationZ = -sinRotationVal * curCarSphere.getCenter().x +
								0 * curCarSphere.getCenter().y +
								cosRotationVal * curCarSphere.getCenter().z;
			curCarSphere.setCenter(new Point(rotationX, rotationY, rotationZ));
			// translation
			curCarSphere.translateCenter(this.carInitialPosition[0] + this.carCameraTranslation.x,
					this.carInitialPosition[1] + this.carCameraTranslation.y,
					this.carInitialPosition[2] + this.carCameraTranslation.z);
		}
		// loops over boxes
		for (int boxNumber = 0; boxNumber < trackBoundingSpheresList.size(); boxNumber++) {
			curTrackSphere = trackBoundingSpheresList.get(boxNumber);
			if (carSpheresList.get(0).checkIntersection(curTrackSphere)) {
				// loops over car spheres
				for (int carSphereNumber = 1; carSphereNumber < carSpheresList.size(); carSphereNumber++) {
					curCarSphere = carSpheresList.get(carSphereNumber);
					if(curCarSphere.checkIntersection(curTrackSphere)) {
						return true;
					}
				}
			}
		}
		return false;

	}

	private void updateCarCameraTranslation(GL2 gl) {
		// Update the car and camera translation values (not the ModelView-Matrix).
		// - Always keep track of the car offset relative to the starting
		// point.
		// - Change the track segments here.
		Vec ret = gameState.getNextTranslation();
		carCameraTranslation = carCameraTranslation.add(ret);
		double dx = Math.max(carCameraTranslation.x, -TrackSegment.ASPHALT_TEXTURE_DEPTH / 2.0 - 2);
		carCameraTranslation.x = (float) Math.min(dx, TrackSegment.ASPHALT_TEXTURE_DEPTH / 2.0 + 2);
		if (Math.abs(carCameraTranslation.z) >= TrackSegment.TRACK_LENGTH + 10.0) {
			carCameraTranslation.z = -(float) (Math.abs(carCameraTranslation.z) % TrackSegment.TRACK_LENGTH);
			gameTrack.changeTrack(gl);
		}
	}

	private void setupCamera(GL2 gl) {
		GLU glu = new GLU();
		if (isBirdseyeView) {
			glu.gluLookAt(0.0 + this.carCameraTranslation.x, 50.0 + this.carCameraTranslation.y, -31.0 + this.carCameraTranslation.z,
						0.0 + this.carCameraTranslation.x, -1.0 + this.carCameraTranslation.y, -31.0 + this.carCameraTranslation.z,
							0.0, 0.0, -1.0);
		} else {
			glu.gluLookAt(0.0 + this.carCameraTranslation.x, 2.0 + this.carCameraTranslation.y, 0.0 + this.carCameraTranslation.z,
					0.0 + this.carCameraTranslation.x, 2.0 + this.carCameraTranslation.y, -1.0 + this.carCameraTranslation.z,
					0.0, 1.0, 0.0);
		}
	}

	private void setupLights(GL2 gl) {
		if (isDayMode) {
			// disable night light
			gl.glDisable(GL2.GL_LIGHT1);
			gl.glDisable(GL2.GL_LIGHT2);

			float[] sunIntensity = {1.0f, 1.0f, 1.0f, 1.0f};
			gl.glLightfv(GL2.GL_LIGHT0, GL2.GL_SPECULAR, sunIntensity, 0);
			gl.glLightfv(GL2.GL_LIGHT0, GL2.GL_DIFFUSE, sunIntensity, 0);

			// 4th value is 0 so we are passing a vector
			// the direction from the intersection point to the light sources
			float[] sunDirection = {0.0f, 1.0f, 1.0f, 0.0f};
			gl.glLightfv(GL2.GL_LIGHT0, GL2.GL_POSITION, sunDirection, 0);
			gl.glEnable(GL2.GL_LIGHT0);

		} else {

			gl.glDisable(GL2.GL_LIGHT0);

			double carAngle = (-1) * Math.toRadians(gameState.getCarRotation());
			float[] spotlightDirection = {-(float) Math.sin(carAngle), 0f, -(float) Math.cos(carAngle)};
			float[] spotlightIntensity = {0.8f, 0.8f, 0.8f, 1.0f};
			float[] spotlight1Pos = {(1.5f + this.carCameraTranslation.x),
									(2.0f + this.carCameraTranslation.y),
									(-8.0f + this.carCameraTranslation.z),
									1.0f};
			float[] spotlight2Pos = {(-1.5f + this.carCameraTranslation.x),
									(2.0f + this.carCameraTranslation.y),
									(-8.0f + this.carCameraTranslation.z),
									1.0f};

			// create first spotlight
			gl.glLightfv(GL2.GL_LIGHT1, GL2.GL_SPECULAR, spotlightIntensity, 0);
			gl.glLightfv(GL2.GL_LIGHT1, GL2.GL_DIFFUSE, spotlightIntensity, 0);
			gl.glLightfv(GL2.GL_LIGHT1, GL2.GL_POSITION, spotlight1Pos, 0);
			gl.glLightf(GL2.GL_LIGHT1, GL2.GL_SPOT_CUTOFF, 50.0f);
			gl.glLightfv(GL2.GL_LIGHT1, GL2.GL_SPOT_DIRECTION, spotlightDirection, 0);

			gl.glEnable(GL2.GL_LIGHT1);

			//create second spotlight
			gl.glLightfv(GL2.GL_LIGHT2, GL2.GL_SPECULAR, spotlightIntensity, 0);
			gl.glLightfv(GL2.GL_LIGHT2, GL2.GL_DIFFUSE, spotlightIntensity, 0);
			gl.glLightfv(GL2.GL_LIGHT2, GL2.GL_POSITION, spotlight2Pos, 0);
			gl.glLightf(GL2.GL_LIGHT2, GL2.GL_SPOT_CUTOFF, 50.0f);
			gl.glLightfv(GL2.GL_LIGHT2, GL2.GL_SPOT_DIRECTION, spotlightDirection, 0);

			gl.glEnable(GL2.GL_LIGHT2);
		}
	}

	private void renderTrack(GL2 gl) {
		// * Note: the track is not translated. It should be fixed.
		gl.glPushMatrix();
		gameTrack.render(gl);
		gl.glPopMatrix();
	}

	private void renderCar(GL2 gl) {
		gl.glPushMatrix();
		// translation
		gl.glTranslated(this.carInitialPosition[0] + this.carCameraTranslation.x,
						this.carInitialPosition[1] + this.carCameraTranslation.y,
						this.carInitialPosition[2] + this.carCameraTranslation.z);
		// rotation
		gl.glRotated(90 - this.gameState.getCarRotation(), 0.0, 1.0, 0.0);
		// scaling
		gl.glScaled(this.scale, this.scale, this.scale);
		this.car.render(gl);
		gl.glPopMatrix();
	}

	public GameState getGameState() {
		return gameState;
	}

	@Override
	public void dispose(GLAutoDrawable drawable) {
	}

	@Override
	public void init(GLAutoDrawable drawable) {
		GL2 gl = drawable.getGL().getGL2();

		// Initialize display callback timer
		ani = new FPSAnimator(30, true);
		ani.add(drawable);
		glPanel.repaint();

		initModel(gl);
		ani.start();
	}

	public void initModel(GL2 gl) {
		gl.glCullFace(GL2.GL_BACK);
		gl.glEnable(GL2.GL_CULL_FACE);

		gl.glEnable(GL2.GL_NORMALIZE);
		gl.glEnable(GL2.GL_DEPTH_TEST);
		gl.glEnable(GL2.GL_LIGHTING);
		gl.glEnable(GL2.GL_SMOOTH);

		car.init(gl);
		gameTrack.init(gl);
		isModelInitialized = true;
	}

	@Override
	public void reshape(GLAutoDrawable drawable, int x, int y, int width, int height) {
		GL2 gl = drawable.getGL().getGL2();
		gl.glMatrixMode(GL2.GL_PROJECTION);
		gl.glLoadIdentity();

		GLU glu = new GLU();
		double aspectRatio = (double)(width) / height;
		glu.gluPerspective(60.0, aspectRatio, 2.0, 500.0);
	}

	/**
	 * Start redrawing the scene with 30 FPS
	 */
	public void startAnimation() {
		if (!ani.isAnimating())
			ani.start();
	}

	/**
	 * Stop redrawing the scene with 30 FPS
	 */
	public void stopAnimation() {
		if (ani.isAnimating())
			ani.stop();
	}

	public void toggleNightMode() {
		isDayMode = !isDayMode;
	}

	public void changeViewMode() {
		isBirdseyeView = !isBirdseyeView;
	}
}
