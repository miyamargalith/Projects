package edu.cg.models.Car;

import java.util.LinkedList;
import java.util.List;

import com.jogamp.opengl.*;

import edu.cg.algebra.Point;
import edu.cg.models.BoundingSphere;
import edu.cg.models.IIntersectable;
import edu.cg.models.IRenderable;

/**
 * A F1 Racing Car.
 *
 */
public class F1Car implements IRenderable, IIntersectable {
	Center carCenter = new Center();
	Back carBack = new Back();
	Front carFront = new Front();

	@Override
	public void render(GL2 gl) {
		carCenter.render(gl);

		gl.glPushMatrix();
		gl.glTranslated(-Specification.B_LENGTH / 2.0 - Specification.C_BASE_LENGTH / 2.0, 0.0, 0.0);

		carBack.render(gl);

		gl.glPopMatrix();
		gl.glPushMatrix();
		gl.glTranslated(Specification.F_LENGTH / 2.0 + Specification.C_BASE_LENGTH / 2.0, 0.0, 0.0);

		carFront.render(gl);
		
		gl.glPopMatrix();

	}

	@Override
	public String toString() {
		return "F1Car";
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

		double maxFront = Math.max(Specification.F_LENGTH, Math.max(Specification.F_DEPTH, Specification.F_HEIGHT));
		double frontSphereRadius = maxFront / 2.0;
		double maxCenter = Math.max(Specification.C_LENGTH, Math.max(Specification.C_DEPTH, Specification.C_HIEGHT));
		double centerSphereRadius = maxCenter / 2.0;
		double maxBack = Math.max(Specification.B_LENGTH, Math.max(Specification.B_DEPTH, Specification.B_HEIGHT));
		double backSphereRadius = maxBack / 2.0;

		double sphereRadius = frontSphereRadius + centerSphereRadius + backSphereRadius;

		Point sphereCenter = new Point(0.0f, 0.0f, 0.0f);
		BoundingSphere s1 = new BoundingSphere(sphereRadius, sphereCenter);
		s1.setSphereColor3d(0.0, 0.0, 0.0);

		boundingSpheres.add(s1);

		BoundingSphere s2 = this.carFront.getBoundingSpheres().get(0);
		s2.translateCenter((Specification.C_LENGTH + Specification.F_LENGTH) / 2, 0.0, 0.0 );
		boundingSpheres.add(s2);


		BoundingSphere s3 = this.carCenter.getBoundingSpheres().get(0);
		boundingSpheres.add(s3);

		BoundingSphere s4 = this.carBack.getBoundingSpheres().get(0);
		s4.translateCenter(-(Specification.C_LENGTH + Specification.B_LENGTH) / 2, 0.0, 0.0 );
		boundingSpheres.add(s4);

		return boundingSpheres;
	}
}
