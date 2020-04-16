package sfrerichs.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import sfrerichs.web.rest.TestUtil;

public class OneThingListTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OneThingList.class);
        OneThingList oneThingList1 = new OneThingList();
        oneThingList1.setId(1L);
        OneThingList oneThingList2 = new OneThingList();
        oneThingList2.setId(oneThingList1.getId());
        assertThat(oneThingList1).isEqualTo(oneThingList2);
        oneThingList2.setId(2L);
        assertThat(oneThingList1).isNotEqualTo(oneThingList2);
        oneThingList1.setId(null);
        assertThat(oneThingList1).isNotEqualTo(oneThingList2);
    }
}
