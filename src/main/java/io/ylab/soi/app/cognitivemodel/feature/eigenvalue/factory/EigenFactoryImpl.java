package io.ylab.soi.app.cognitivemodel.feature.eigenvalue.factory;

import org.apache.commons.math3.linear.Array2DRowRealMatrix;
import org.apache.commons.math3.linear.EigenDecomposition;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EigenFactoryImpl implements EigenFactory {
    @Override
    public EigenDecomposition create(List<List<Double>> matrix) {
        double[][] array = matrix.stream()
                .map(row -> row.stream().mapToDouble(Double::doubleValue).toArray())
                .toArray(double[][]::new);
        Array2DRowRealMatrix realMatrix = new Array2DRowRealMatrix(array);
        return new EigenDecomposition(realMatrix);
    }
}