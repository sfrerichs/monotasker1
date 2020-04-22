package sfrerichs.web.rest;

import sfrerichs.MonotaskerApp;
import sfrerichs.domain.OneThingList;
import sfrerichs.repository.OneThingListRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OneThingListResource} REST controller.
 */
@SpringBootTest(classes = MonotaskerApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class OneThingListResourceIT {

    private static final String DEFAULT_MY_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_MY_TEXT = "BBBBBBBBBB";

    @Autowired
    private OneThingListRepository oneThingListRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOneThingListMockMvc;

    private OneThingList oneThingList;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OneThingList createEntity(EntityManager em) {
        OneThingList oneThingList = new OneThingList()
            .myText(DEFAULT_MY_TEXT);
        return oneThingList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OneThingList createUpdatedEntity(EntityManager em) {
        OneThingList oneThingList = new OneThingList()
            .myText(UPDATED_MY_TEXT);
        return oneThingList;
    }

    @BeforeEach
    public void initTest() {
        oneThingList = createEntity(em);
    }

    @Test
    @Transactional
    public void createOneThingList() throws Exception {
        int databaseSizeBeforeCreate = oneThingListRepository.findAll().size();

        // Create the OneThingList
        restOneThingListMockMvc.perform(post("/api/one-thing-lists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oneThingList)))
            .andExpect(status().isCreated());

        // Validate the OneThingList in the database
        List<OneThingList> oneThingListList = oneThingListRepository.findAll();
        assertThat(oneThingListList).hasSize(databaseSizeBeforeCreate + 1);
        OneThingList testOneThingList = oneThingListList.get(oneThingListList.size() - 1);
        assertThat(testOneThingList.getMyText()).isEqualTo(DEFAULT_MY_TEXT);
    }

    @Test
    @Transactional
    public void createOneThingListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = oneThingListRepository.findAll().size();

        // Create the OneThingList with an existing ID
        oneThingList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOneThingListMockMvc.perform(post("/api/one-thing-lists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oneThingList)))
            .andExpect(status().isBadRequest());

        // Validate the OneThingList in the database
        List<OneThingList> oneThingListList = oneThingListRepository.findAll();
        assertThat(oneThingListList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOneThingLists() throws Exception {
        // Initialize the database
        oneThingListRepository.saveAndFlush(oneThingList);

        // Get all the oneThingListList
        restOneThingListMockMvc.perform(get("/api/one-thing-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oneThingList.getId().intValue())))
            .andExpect(jsonPath("$.[*].myText").value(hasItem(DEFAULT_MY_TEXT)));
    }
    
    @Test
    @Transactional
    public void getOneThingList() throws Exception {
        // Initialize the database
        oneThingListRepository.saveAndFlush(oneThingList);

        // Get the oneThingList
        restOneThingListMockMvc.perform(get("/api/one-thing-lists/{id}", oneThingList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oneThingList.getId().intValue()))
            .andExpect(jsonPath("$.myText").value(DEFAULT_MY_TEXT));
    }

    @Test
    @Transactional
    public void getNonExistingOneThingList() throws Exception {
        // Get the oneThingList
        restOneThingListMockMvc.perform(get("/api/one-thing-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOneThingList() throws Exception {
        // Initialize the database
        oneThingListRepository.saveAndFlush(oneThingList);

        int databaseSizeBeforeUpdate = oneThingListRepository.findAll().size();

        // Update the oneThingList
        OneThingList updatedOneThingList = oneThingListRepository.findById(oneThingList.getId()).get();
        // Disconnect from session so that the updates on updatedOneThingList are not directly saved in db
        em.detach(updatedOneThingList);
        updatedOneThingList
            .myText(UPDATED_MY_TEXT);

        restOneThingListMockMvc.perform(put("/api/one-thing-lists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOneThingList)))
            .andExpect(status().isOk());

        // Validate the OneThingList in the database
        List<OneThingList> oneThingListList = oneThingListRepository.findAll();
        assertThat(oneThingListList).hasSize(databaseSizeBeforeUpdate);
        OneThingList testOneThingList = oneThingListList.get(oneThingListList.size() - 1);
        assertThat(testOneThingList.getMyText()).isEqualTo(UPDATED_MY_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingOneThingList() throws Exception {
        int databaseSizeBeforeUpdate = oneThingListRepository.findAll().size();

        // Create the OneThingList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOneThingListMockMvc.perform(put("/api/one-thing-lists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oneThingList)))
            .andExpect(status().isBadRequest());

        // Validate the OneThingList in the database
        List<OneThingList> oneThingListList = oneThingListRepository.findAll();
        assertThat(oneThingListList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOneThingList() throws Exception {
        // Initialize the database
        oneThingListRepository.saveAndFlush(oneThingList);

        int databaseSizeBeforeDelete = oneThingListRepository.findAll().size();

        // Delete the oneThingList
        restOneThingListMockMvc.perform(delete("/api/one-thing-lists/{id}", oneThingList.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OneThingList> oneThingListList = oneThingListRepository.findAll();
        assertThat(oneThingListList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
