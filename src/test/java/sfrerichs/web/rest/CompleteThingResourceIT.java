package sfrerichs.web.rest;

import sfrerichs.MonotaskerApp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the CompleteThingResource REST controller.
 *
 * @see CompleteThingResource
 */
@SpringBootTest(classes = MonotaskerApp.class)
public class CompleteThingResourceIT {

    private MockMvc restMockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        CompleteThingResource completeThingResource = new CompleteThingResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(completeThingResource)
            .build();
    }

    /**
     * Test markComplete
     */
    @Test
    public void testMarkComplete() throws Exception {
        restMockMvc.perform(put("/api/complete-thing/mark-complete"))
            .andExpect(status().isOk());
    }
}
