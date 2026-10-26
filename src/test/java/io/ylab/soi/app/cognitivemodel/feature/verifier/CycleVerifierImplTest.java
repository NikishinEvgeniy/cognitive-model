package io.ylab.soi.app.cognitivemodel.feature.verifier;

import io.ylab.soi.app.cognitivemodel.feature.cycles.verifier.CycleVerifierImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
@DisplayName("")
class CycleVerifierImplTest {

    @InjectMocks
    private CycleVerifierImpl cycleVerifier;

    static Stream<Arguments> cycles() {
        return Stream.of(
                Arguments.of(List.of(1.0, -2.0, -3.0), '+'),
                Arguments.of(List.of(1.0, -5.0), '-'),
                Arguments.of(List.of(), '?')
        );
    }

    @ParameterizedTest
    @MethodSource("cycles")
    @DisplayName("")
    void should(List<Double> cycles, Character expectedSign) {
        // Arrange (method source) && Act
        Character sign = cycleVerifier.verify(cycles);

        // Assert
        assertThat(sign).isEqualTo(expectedSign);
    }
}