package sfrerichs.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import sfrerichs.web.rest.TestUtil;

public class ThingsListTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThingsList.class);
        ThingsList thingsList1 = new ThingsList();
        thingsList1.setId(1L);
        ThingsList thingsList2 = new ThingsList();
        thingsList2.setId(thingsList1.getId());
        assertThat(thingsList1).isEqualTo(thingsList2);
        thingsList2.setId(2L);
        assertThat(thingsList1).isNotEqualTo(thingsList2);
        thingsList1.setId(null);
        assertThat(thingsList1).isNotEqualTo(thingsList2);
    }
}
