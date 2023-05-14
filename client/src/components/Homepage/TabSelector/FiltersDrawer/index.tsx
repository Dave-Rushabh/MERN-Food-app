import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Spinner,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_FILTERS_LIST,
  ADD_CHECKED_FILTER_INTO_FILTERS_LIST,
  REMOVE_UNCHECKED_FILTER_INTO_FILTERS_LIST,
} from '../../../../../redux/slice/homepageSlice';

interface FiltersDrawer {
  isOpen: boolean;
  onClose: () => void;
  iconRef: any;
}

const FiltersDrawer = ({ isOpen, onClose, iconRef }: FiltersDrawer) => {
  const dispatch = useDispatch();

  const { data: filtersList, isFetchingFilters } = useSelector(
    (state: any) => state.homepageReducer.filtersList
  );

  useEffect(() => {
    if (!filtersList.length) {
      dispatch(GET_FILTERS_LIST());
    }
  }, []);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={iconRef}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="flex items-center h-8 px-4 justify-start my-4">
            <div
              className="w-12 px-2 py-1 rounded-md bg-slate-200 hover:cursor-pointer"
              onClick={onClose}
            >
              <MdOutlineKeyboardBackspace size={'1.8rem'} color={'#1d3557'} />
            </div>
          </div>
          <DrawerBody>
            {isFetchingFilters ? (
              <div className="filters-loader-wrapper">
                <div>
                  <Spinner />
                </div>
                <div>Fetching Applicable Filters ...</div>
              </div>
            ) : (
              <>
                <div className="container mx-auto p-4">
                  <div className="flex gap-2 justify-between items-center mb-4">
                    <div className="text-xl font-semibold text-app_primary_light">
                      Food Options
                    </div>
                    <div>
                      <button
                        className="bg-white border-2 border-app_primary_light rounded-md p-2 text-app_primary_light hover:bg-app_primary_light hover:text-white"
                        onClick={() => {}}
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <hr className="bg-app_primary_orange h-0.5" />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {filtersList.map((option: any, index: number) => (
                      <div key={index.toString()} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`option-${index}`}
                          checked={option.checked}
                          onChange={(e: any) => {
                            if (e.target.checked) {
                              dispatch(
                                ADD_CHECKED_FILTER_INTO_FILTERS_LIST(
                                  option.option
                                )
                              );
                            } else {
                              dispatch(
                                REMOVE_UNCHECKED_FILTER_INTO_FILTERS_LIST(
                                  option.option
                                )
                              );
                            }
                          }}
                          className="mr-2"
                        />
                        <label htmlFor={`option-${index}`} className="text-sm">
                          {option.option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FiltersDrawer;
