package edu.cg.models.Car;

import java.util.LinkedList;
import java.util.List;

import com.jogamp.opengl.GL2;
import com.jogamp.opengl.glu.GLU;
import com.jogamp.opengl.glu.GLUquadric;
import edu.cg.algebra.Point;
import edu.cg.algebra.Vec;
import edu.cg.models.BoundingSphere;
import edu.cg.models.IIntersectable;
import edu.cg.models.IRenderable;
import edu.cg.models.SkewedBox;

public class Back implements IRenderable, IIntersectable {
	private SkewedBox baseBox = new SkewedBox(Specification.B_BASE_LENGTH, Specification.B_BASE_HEIGHT,
			Specification.B_BASE_HEIGHT, Specification.B_BASE_DEPTH, Specification.B_BASE_DEPTH);
	private SkewedBox backBox = new SkewedBox(Specification.B_LENGTH, Specification.B_HEIGHT_1,
			Specification.B_HEIGHT_2, Specification.B_DEPTH_1, Specification.B_DEPTH_2);
	private PairOfWheels wheels = new PairOfWheels();
	private Spolier spoiler = new Spolier();

	@Override
	public void render(GL2 gl) {

		//base box
		gl.glPushMatrix();
		Materials.SetLightPinkMetalMaterial(gl);
		gl.glTranslated(Specification.B_LENGTH / 2.0 - Specification.B_BASE_LENGTH / 2.0, 0.0, 0.0);
		baseBox.render(gl);

		//back box
		Materials.SetPinkMetalMaterial(gl);
		gl.glTranslated(-1.0 * (Specification.B_LENGTH / 2.0 - Specification.B_BASE_LENGTH / 2.0),
				Specification.B_BASE_HEIGHT, 0.0);
		backBox.render(gl);

		//wheels
		gl.glPopMatrix();
		gl.glPushMatrix();
		gl.glTranslated(-Specification.B_LENGTH / 2.0 + Specification.TIRE_RADIUS, 0.5 * Specification.TIRE_RADIUS,
				0.0);
		wheels.render(gl);

		//spolier
		gl.glPopMatrix();
		gl.glPushMatrix();
		gl.glTranslated(-Specification.B_LENGTH / 2.0 + 0.5 * Specification.S_LENGTH,
				0.5 * (Specification.B_HEIGHT_1 + Specification.B_HEIGHT_2), 0.0);
		spoiler.render(gl);

		gl.glPopMatrix();
		gl.glPushMatrix();

		//create exhaust pipes
		GLU glu = new GLU();
		GLUquadric quad = glu.gluNewQuadric();

		gl.glTranslated(-Specification.B_LENGTH / 2 - 0.02, 0.04, 0.03);
		gl.glRotated(90.0, 0.0, 1.0, 0.0);

		Materials.SetDarkGreyMetalMaterial(gl);
		glu.gluCylinder(quad, 0.02, 0.02, 0.02, 20, 2);

		gl.glPopMatrix();
		gl.glPushMatrix();

		gl.glTranslated(-Specification.B_LENGTH / 2 - 0.02, 0.04, -0.03);
		gl.glRotated(90.0, 0.0, 1.0, 0.0);

		Materials.SetBrownMetalMaterial(gl);
		glu.gluCylinder(quad, 0.02, 0.02, 0.02, 20, 2);

		gl.glPopMatrix();
	}

	@Override
	public void init(GL2 gl) {
	}

	@Override
	public void destroy(GL2 gl) {

	}

	@Override
	public List<BoundingSphere> getBoundingSpheres() {
		LinkedList<BoundingSphere> boundingSpheres = new LinkedList<BoundingSphere>();

		double sphereRadius = new Vec(
				Specification.B_LENGTH / 2,
				Specification.B_HEIGHT / 2,
				Specification.B_DEPTH / 2).norm();

		Point centerPoint = new Point(0, (Specification.B_HEIGHT / 2.0), 0);

		BoundingSphere sphere = new BoundingSphere(sphereRadius, centerPoint);
		sphere.setSphereColor3d(0.0, 0.0, 1.0);

		boundingSpheres.add(sphere);
		return boundingSpheres;
	}
}
